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
let sessions = [];

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

sessions.push({
  token: token,
  email: user.email,
});

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

  sessions.push({
  token: token,
  email: user.email,
});

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

// Verify that the user is authenticated
function verifyAuth(req, res, next) {
  const token = req.cookies[authCookieName];

  const session = sessions.find((session) => session.token === token);

  if (!session) {
    return res.status(401).send({ message: 'You must be logged in.' });
  }

  req.user = users.find((user) => user.email === session.email);

  next();
}

// Log out the user
app.delete('/api/auth/logout', verifyAuth, (req, res) => {
  const token = req.cookies[authCookieName];

  sessions = sessions.filter((session) => session.token !== token);

  res.clearCookie(authCookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.send({ message: 'Logged out successfully.' });
});

// Check whether the user is logged in
app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.send({
    name: req.user.name,
    email: req.user.email,
  });
});

// Get all clothing items for the logged-in user
app.get('/api/clothes', verifyAuth, (req, res) => {
  const userClothes = clothes.filter(
    (item) => item.userEmail === req.user.email
  );

  res.send(userClothes);
});

// Add a clothing item
app.post('/api/clothes', verifyAuth, (req, res) => {
  const newClothing = {
    id: uuidv4(),
    userEmail: req.user.email,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    brand: req.body.brand,
    image: req.body.image,
  };

  clothes.push(newClothing);

  res.send(newClothing);
});

// Delete a clothing item
app.delete('/api/clothes/:id', verifyAuth, (req, res) => {
  const clothing = clothes.find(
    (item) =>
      item.id === req.params.id &&
      item.userEmail === req.user.email
  );

  if (!clothing) {
    return res.status(404).send({ message: 'Clothing item not found.' });
  }

  clothes = clothes.filter((item) => item.id !== req.params.id);

  res.send({ message: 'Clothing item removed.' });
});

// Get all outfits for the logged-in user
app.get('/api/outfits', verifyAuth, (req, res) => {
  const userOutfits = outfits.filter(
    (outfit) => outfit.userEmail === req.user.email
  );

  res.send(userOutfits);
});

// Create a new outfit
app.post('/api/outfits', verifyAuth, (req, res) => {
  const newOutfit = {
    id: uuidv4(),
    userEmail: req.user.email,
    name: req.body.name,
    items: req.body.items,
  };

  outfits.push(newOutfit);

  res.send(newOutfit);
});

// Delete an outfit
app.delete('/api/outfits/:id', verifyAuth, (req, res) => {
  const outfit = outfits.find(
    (item) =>
      item.id === req.params.id &&
      item.userEmail === req.user.email
  );

  if (!outfit) {
    return res.status(404).send({ message: 'Outfit not found.' });
  }

  outfits = outfits.filter((item) => item.id !== req.params.id);

  res.send({ message: 'Outfit removed.' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});