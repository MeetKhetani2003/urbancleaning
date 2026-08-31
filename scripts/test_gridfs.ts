import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs';

const DEST_URI = 'mongodb://sumitraj2981_db_user:50sbYsGWsbOUyhOP@ac-tiw2tmg-shard-00-00.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-01.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-02.cuueqy4.mongodb.net:27017/urban-shine?ssl=true&replicaSet=atlas-3o5ju0-shard-0&authSource=admin&appName=Cluster0';

async function testGridFS() {
  const destClient = new MongoClient(DEST_URI);

  try {
    await destClient.connect();
    const destDb = destClient.db();

    // Find a file to test
    const filesColl = destDb.collection('uploads.files');
    const file = await filesColl.findOne({});

    if (!file) {
      console.log('No files found in uploads.files');
      return;
    }

    console.log('Found file:', file.filename, 'ID:', file._id);

    // Verify chunks
    const chunksColl = destDb.collection('uploads.chunks');
    const chunksCount = await chunksColl.countDocuments({ files_id: file._id });
    console.log(`Found ${chunksCount} chunks for this file.`);

    const bucket = new GridFSBucket(destDb, { bucketName: 'uploads' });
    const downloadStream = bucket.openDownloadStream(file._id);
    
    const writeStream = fs.createWriteStream('test_download.jpg');
    
    downloadStream.pipe(writeStream);
    
    downloadStream.on('error', (err) => {
      console.error('Error downloading:', err);
    });
    
    writeStream.on('finish', () => {
      console.log('File downloaded successfully to test_download.jpg');
      
      const stats = fs.statSync('test_download.jpg');
      console.log('File size on disk:', stats.size);
      console.log('Expected file size:', file.length);
    });

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    // Note: Can't close client immediately if streams are piping.
    setTimeout(() => destClient.close(), 2000);
  }
}

testGridFS();
