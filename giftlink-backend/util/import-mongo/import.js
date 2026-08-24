require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connectToDatabase = require('./db');

async function importData() {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');

    const filePath = path.join(__dirname, 'gifts.json');
    const gifts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await collection.deleteMany({});
    const result = await collection.insertMany(gifts);

    console.log(`Inserted ${result.insertedCount} gifts into the database.`);
    process.exit(0);
}

importData().catch((err) => {
    console.error('Error importing data:', err);
    process.exit(1);
});
