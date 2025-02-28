const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://gehringerhugo:czdsi388bFsr81DT@cluster0.0v0lc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('project_db');

    await db.createCollection('users');

    await db.collection('users').insertOne({
      firstName: "Admin",
      lastName: "Admin",
      email: "loise.fenoll@ynov.com",
      password: "ANKymoUTFu4rbybmQ9Mt",
      birthDate: new Date("1990-01-01"),
      city: "Montpellier",
      postalCode: "34000",
      isAdmin: true
    });

    console.log("Admin created successfully!");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);