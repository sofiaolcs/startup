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

// Create a new user
app.post('/api/auth/create', async (req, res) => {
  if (users.find((user) => user.email === req.body.email)) {
    return res.status(409).send({ message: 'Email already registered.' });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
  };

  users.push(user);

  const token = uuidv4();

  res.cookie(authCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.send({
    name: user.name,
    email: user.email,
  });
});

// Login an existing user
app.post('/api/auth/login', async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password.' });
  }

  const passwordMatches = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordMatches) {
    return res.status(401).send({ message: 'Invalid email or password.' });
  }

  const token = uuidv4();

  res.cookie(authCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.send({
    name: user.name,
    email: user.email,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});