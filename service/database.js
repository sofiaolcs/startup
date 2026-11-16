require('dotenv').config();

const { MongoClient } = require('mongodb');

// Read MongoDB credentials from environment variables
const hostname = process.env.MONGO_HOSTNAME;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

// Verify that credentials are configured
if (!hostname || !username || !password) {
  throw new Error('Missing MongoDB environment variables.');
}

// Create MongoDB connection URL
const url = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostname}`;

const client = new MongoClient(url);
const db = client.db('passarela');

// MongoDB collections
const userCollection = db.collection('users');
const clothesCollection = db.collection('clothes');
const outfitsCollection = db.collection('outfits');
const sessionsCollection = db.collection('sessions');
const plannedOutfitsCollection = db.collection('plannedOutfits');
const messagesCollection = db.collection('messages');

// Connect to MongoDB
async function connectDatabase() {
  await client.connect();
  await db.command({ ping: 1 });

  // Prevent duplicate user emails
  await userCollection.createIndex(
    { email: 1 },
    { unique: true }
  );

  // Prevent duplicate session tokens
  await sessionsCollection.createIndex(
    { token: 1 },
    { unique: true }
  );

  console.log('Connected to MongoDB!');
}

module.exports = {
  connectDatabase,
  userCollection,
  clothesCollection,
  outfitsCollection,
  sessionsCollection,
  plannedOutfitsCollection,
  messagesCollection,
};