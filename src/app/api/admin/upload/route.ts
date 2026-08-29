import { NextResponse } from 'next/server';
import { connectDB, getGridFSBucket } from '@/lib/db';
import { Readable } from 'stream';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    await connectDB();
    const bucket = await getGridFSBucket();

    // Convert Web File stream to Node.js Readable stream
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    return new Promise<NextResponse>((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(file.name, {
        metadata: { contentType: file.type },
      });

      readableStream.pipe(uploadStream)
        .on('error', (error) => {
          console.error('GridFS Upload Error:', error);
          resolve(NextResponse.json({ error: 'Failed to upload image' }, { status: 500 }));
        })
        .on('finish', () => {
          resolve(NextResponse.json({ 
            success: true, 
            fileId: uploadStream.id.toString(),
            url: `/api/images/${uploadStream.id.toString()}`
          }));
        });
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
