import { MongoClient } from 'mongodb';

const DEST_URI = 'mongodb://sumitraj2981_db_user:50sbYsGWsbOUyhOP@ac-tiw2tmg-shard-00-00.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-01.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-02.cuueqy4.mongodb.net:27017/urban-shine?ssl=true&replicaSet=atlas-3o5ju0-shard-0&authSource=admin&appName=Cluster0';

async function checkFileDoc() {
  const destClient = new MongoClient(DEST_URI);

  try {
    await destClient.connect();
    const destDb = destClient.db();

    const filesColl = destDb.collection('uploads.files');
    const file = await filesColl.findOne({});
    console.log("Sample file doc:", file);

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await destClient.close();
  }
}

checkFileDoc();
