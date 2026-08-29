import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Import config directly using standard dotenv since this runs outside Next.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// We must redefine these here since Next.js @/ aliases don't work reliably in raw ts-node scripts
// without tsconfig-paths, and to keep it foolproof we use relative paths.
import { Service } from '../src/models/Service';
import { Package } from '../src/models/Package';
import { Contact } from '../src/models/Contact';
import { Gallery, BeforeAfter } from '../src/models/Gallery';

import servicesData from '../data/services';
import packagesData from '../data/packages';
import contactData from '../data/contact';
import galleryData, { comparisons } from '../data/gallery';

const MONGODB_URI = process.env.MONGODB_URI;

async function uploadFileToGridFS(bucket: mongoose.mongo.GridFSBucket, filePath: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(process.cwd(), 'public', filePath);
    
    if (!fs.existsSync(absolutePath)) {
      console.warn(`File not found: ${absolutePath}, saving as string instead`);
      return resolve(filePath);
    }

    const readStream = fs.createReadStream(absolutePath);
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { contentType: 'image/jpeg' } // Assuming jpeg for seeder
    });
    
    readStream.pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => {
        resolve(uploadStream.id.toString());
      });
  });
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!");

  const db = mongoose.connection.db;
  if (!db) throw new Error("DB Connection failed");
  
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: 'uploads'
  });

  console.log("Clearing existing data...");
  await Service.deleteMany({});
  await Package.deleteMany({});
  await Contact.deleteMany({});
  await Gallery.deleteMany({});
  await BeforeAfter.deleteMany({});

  console.log("Seeding Contact Info...");
  await Contact.create(contactData);

  console.log("Seeding Services...");
  for (const service of servicesData) {
    console.log(`Processing service: ${service.slug}`);
    const mainImageId = await uploadFileToGridFS(bucket, service.image, `${service.slug}-main.jpg`);
    
    const whatWeCleanImagesIds = [];
    const whatWeCleanImages = service.whatWeCleanImages || [];
    for (let i = 0; i < whatWeCleanImages.length; i++) {
      const id = await uploadFileToGridFS(bucket, whatWeCleanImages[i], `${service.slug}-detail-${i}.jpg`);
      whatWeCleanImagesIds.push(id);
    }

    await Service.create({
      ...service,
      image: mainImageId,
      whatWeCleanImages: whatWeCleanImagesIds
    });
  }

  console.log("Seeding Packages...");
  for (const pkg of packagesData) {
    console.log(`Processing package: ${pkg.slug}`);
    const imageId = await uploadFileToGridFS(bucket, pkg.image, `${pkg.slug}-pkg.jpg`);
    await Package.create({
      ...pkg,
      image: imageId
    });
  }

  console.log("Seeding Gallery...");
  for (const item of galleryData) {
    console.log(`Processing gallery item: ${item.alt}`);
    const imageId = await uploadFileToGridFS(bucket, item.src, `gallery-${item.category}-${Date.now()}.jpg`);
    await Gallery.create({
      title: item.alt,
      category: item.category,
      span: item.orientation === 'portrait' ? 'col-span-1 row-span-2' : 'col-span-2 row-span-1',
      image: imageId
    });
  }

  console.log("Seeding Before/After Comparisons...");
  for (const comp of comparisons) {
    console.log(`Processing comparison: ${comp.title}`);
    const beforeId = await uploadFileToGridFS(bucket, comp.before, `before-${comp.title}.jpg`);
    const afterId = await uploadFileToGridFS(bucket, comp.after, `after-${comp.title}.jpg`);
    await BeforeAfter.create({
      title: comp.title,
      before: beforeId,
      after: afterId
    });
  }

  console.log("Migration complete!");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
