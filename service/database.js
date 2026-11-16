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

async function connectDatabase() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log('Connected to MongoDB!');
}

module.exports = {
  connectDatabase,
  userCollection,
  clothesCollection,
  outfitsCollection,
  sessionsCollection,
};