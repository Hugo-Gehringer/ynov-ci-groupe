const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://gehringerhugo:czdsi388bFsr81DT@cluster0.0v0lc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = 'project_db';

async function checkDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const db = client.db(dbName);

    const collections = await db.listCollections().toArray();
    console.log("Collections in the database:", collections);

    const userCollectionExists = collections.some(collection => collection.name === 'users');
    if (userCollectionExists) {
      console.log("The 'users' collection exists.");

      const userCollection = db.collection('users');
      const adminUser = await userCollection.findOne({ firstName: 'Admin' });

      if (adminUser) {
        console.log("The Admin user exists:", adminUser);
      } else {
        console.log("The Admin user does not exist.");
      }
    } else {
      console.log("The 'users' collection does not exist.");
    }

  } catch (err) {
    console.error("Error while connecting to MongoDB:", err.message);
  } finally {
    await client.close();
  }
}

checkDatabase();
