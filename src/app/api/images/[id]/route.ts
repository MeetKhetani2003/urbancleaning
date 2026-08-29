import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB, getGridFSBucket } from '@/lib/db';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;
    
    // Simple validation for MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    await connectDB();
    const bucket = await getGridFSBucket();

    const objectId = new mongoose.Types.ObjectId(id);

    // Check if file exists
    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Set up a readable stream
    const downloadStream = bucket.openDownloadStream(objectId);

    // Convert the Node.js readable stream into a Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => controller.enqueue(chunk));
        downloadStream.on('end', () => controller.close());
        downloadStream.on('error', (err) => controller.error(err));
      }
    });

    // Determine content type (default to jpeg if unknown)
    const metadata = files[0].metadata as any;
    const contentType = metadata?.contentType || 'image/jpeg';

    return new NextResponse(webStream as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}
