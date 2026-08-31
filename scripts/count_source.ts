import { MongoClient } from 'mongodb';

const SOURCE_URI = 'mongodb://testing:test@ac-klwqa1u-shard-00-00.cxiopss.mongodb.net:27017,ac-klwqa1u-shard-00-01.cxiopss.mongodb.net:27017,ac-klwqa1u-shard-00-02.cxiopss.mongodb.net:27017/urban-shine?ssl=true&replicaSet=atlas-apjda9-shard-0&authSource=admin&appName=Cluster0';

async function countSourceChunks() {
  const sourceClient = new MongoClient(SOURCE_URI);

  try {
    await sourceClient.connect();
    const sourceDb = sourceClient.db();

    const chunksColl = sourceDb.collection('uploads.chunks');
    const chunksCount = await chunksColl.countDocuments();
    console.log(`Source chunks count: ${chunksCount}`);

    const filesColl = sourceDb.collection('uploads.files');
    const filesCount = await filesColl.countDocuments();
    console.log(`Source files count: ${filesCount}`);

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await sourceClient.close();
  }
}

countSourceChunks();
