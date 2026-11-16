const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const username = encodeURIComponent(config.userName);
const password = encodeURIComponent(config.password);

const url = `mongodb+srv://${username}:${password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('passarela');

const userCollection = db.collection('users');
const clothesCollection = db.collection('clothes');
const outfitsCollection = db.collection('outfits');
const sessionsCollection = db.collection('sessions');
const plannedOutfitsCollection = db.collection('plannedOutfits');
const messagesCollection = db.collection('messages');

async function connectDatabase() {
  await client.connect();
  await db.command({ ping: 1 });

  await userCollection.createIndex(
    { email: 1 },
    { unique: true }
  );

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