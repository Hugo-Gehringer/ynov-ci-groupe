const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://admin:password@localhost:27017/project_db?authSource=admin';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('project_db');

    await db.createCollection('users');

    await db.collection('users').insertOne({
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "a",
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