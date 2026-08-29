import { MongoClient } from 'mongodb';

const SOURCE_URI = 'mongodb://testing:test@ac-klwqa1u-shard-00-00.cxiopss.mongodb.net:27017,ac-klwqa1u-shard-00-01.cxiopss.mongodb.net:27017,ac-klwqa1u-shard-00-02.cxiopss.mongodb.net:27017/urban-shine?ssl=true&replicaSet=atlas-apjda9-shard-0&authSource=admin&appName=Cluster0';

// Added /urban-shine before ?ssl=true to ensure it targets the same DB name
const DEST_URI = 'mongodb://sumitraj2981_db_user:50sbYsGWsbOUyhOP@ac-tiw2tmg-shard-00-00.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-01.cuueqy4.mongodb.net:27017,ac-tiw2tmg-shard-00-02.cuueqy4.mongodb.net:27017/urban-shine?ssl=true&replicaSet=atlas-3o5ju0-shard-0&authSource=admin&appName=Cluster0';

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const destClient = new MongoClient(DEST_URI);

  try {
    await sourceClient.connect();
    await destClient.connect();

    console.log("Connected to both databases.");

    const sourceDb = sourceClient.db();
    const destDb = destClient.db();

    const collections = await sourceDb.listCollections().toArray();
    
    for (const collInfo of collections) {
      if (collInfo.type === 'view') continue;
      
      const collName = collInfo.name;
      console.log(`Processing collection: ${collName}`);
      
      const sourceColl = sourceDb.collection(collName);
      const destColl = destDb.collection(collName);

      const docs = await sourceColl.find({}).toArray();
      
      if (docs.length > 0) {
        // Use bulkWrite with replaceOne + upsert to avoid duplicate key errors without deleting existing data
        const operations = docs.map(doc => ({
          replaceOne: {
            filter: { _id: doc._id },
            replacement: doc,
            upsert: true
          }
        }));

        try {
          const result = await destColl.bulkWrite(operations, { ordered: false });
          console.log(` - Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}, Matched: ${result.matchedCount}`);
        } catch (e: any) {
          console.error(` - Error inserting into ${collName}:`, e.message);
        }
      } else {
        console.log(` - Collection is empty.`);
      }
    }
    
    console.log("Migration completed successfully.");

  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await sourceClient.close();
    await destClient.close();
  }
}

migrate();
