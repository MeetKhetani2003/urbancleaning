import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { connectDB, getGridFSBucket } from '@/lib/db';
import { Service } from '@/models/Service';
import { Package } from '@/models/Package';
import { Contact } from '@/models/Contact';
import { Gallery, BeforeAfter } from '@/models/Gallery';

// Import data
import servicesData from '../../../../data/services';
import packagesData from '../../../../data/packages';
import contactData from '../../../../data/contact';
import galleryData, { comparisons } from '../../../../data/gallery';

async function uploadFileToGridFS(bucket: mongoose.mongo.GridFSBucket, filePath: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // If the path starts with /images, map it to public/images
    const absolutePath = path.join(process.cwd(), 'public', filePath);
    
    if (!fs.existsSync(absolutePath)) {
      console.warn(`File not found: ${absolutePath}, using original path string`);
      return resolve(filePath); // Fallback to just storing the string if file doesn't exist
    }

    const readStream = fs.createReadStream(absolutePath);
    const uploadStream = bucket.openUploadStream(filename);
    
    readStream.pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => {
        resolve(uploadStream.id.toString());
      });
  });
}

export async function GET() {
  try {
    await connectDB();
    const bucket = await getGridFSBucket();

    // 1. Clear existing data
    await Service.deleteMany({});
    await Package.deleteMany({});
    await Contact.deleteMany({});
    await Gallery.deleteMany({});
    await BeforeAfter.deleteMany({});

    // 2. Seed Contact
    await Contact.create(contactData);

    // 3. Seed Services
    for (const service of servicesData) {
      console.log(`Processing service: ${service.slug}`);
      const mainImageId = await uploadFileToGridFS(bucket, service.image, `${service.slug}-main.jpg`);
      
      const whatWeCleanImagesIds = [];
      const whatWeCleanImages = service.whatWeCleanImages || [];
      for (let i = 0; i < whatWeCleanImages.length; i++) {
        const imgPath = whatWeCleanImages[i];
        const id = await uploadFileToGridFS(bucket, imgPath, `${service.slug}-detail-${i}.jpg`);
        whatWeCleanImagesIds.push(id);
      }

      await Service.create({
        ...service,
        image: mainImageId,
        whatWeCleanImages: whatWeCleanImagesIds
      });
    }

    // 4. Seed Packages
    for (const pkg of packagesData) {
      const imageId = await uploadFileToGridFS(bucket, pkg.image, `${pkg.slug}-pkg.jpg`);
      await Package.create({
        ...pkg,
        image: imageId
      });
    }

    // 5. Seed Gallery
    for (const item of galleryData) {
      const imageId = await uploadFileToGridFS(bucket, item.src, `gallery-${item.category}-${Date.now()}.jpg`);
      await Gallery.create({
        title: item.alt,
        category: item.category,
        span: item.orientation === 'portrait' ? 'col-span-1 row-span-2' : 'col-span-2 row-span-1',
        image: imageId
      });
    }

    // 6. Seed Comparisons (Before/After)
    for (const comp of comparisons) {
      const beforeId = await uploadFileToGridFS(bucket, comp.before, `before-${comp.title}.jpg`);
      const afterId = await uploadFileToGridFS(bucket, comp.after, `after-${comp.title}.jpg`);
      await BeforeAfter.create({
        title: comp.title,
        before: beforeId,
        after: afterId
      });
    }

    return NextResponse.json({ success: true, message: "Migration completed successfully!" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
