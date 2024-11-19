const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'ynov_ci';

async function main() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        const db = client.db(dbName);
        const collection = db.collection('users');

        const users = await collection.find({}).toArray();
        console.log('Users:', users);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);