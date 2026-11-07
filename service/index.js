const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Authentication cookie name
const authCookieName = 'token';

// Middleware
app.use(express.json());
app.use(cookieParser());

// In-memory data
let users = [];
let clothes = [];
let outfits = [];

// Test endpoint
app.get('/api/hello', (_req, res) => {
  res.send({ message: 'Welcome to Passarela!' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});