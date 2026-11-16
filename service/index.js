const path = require('path');
const express = require('express');
const {
  connectDatabase,
  userCollection,
  clothesCollection,
  outfitsCollection,
  sessionsCollection,
  plannedOutfitsCollection,
  messagesCollection,
} = require('./database');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Authentication cookie name
const authCookieName = 'token';

// Middleware
app.use(express.json());
app.use(cookieParser());

// Test endpoint
app.get('/api/hello', (_req, res) => {
  res.send({ message: 'Welcome to Passarela!' });
});

app.get('/api/weather', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=40.2338&longitude=-111.6585&current=temperature_2m,relative_humidity_2m,weather_code'
    );

    const weather = await response.json();

    res.send(weather);
  } catch (error) {
    res.status(500).send({ message: 'Unable to retrieve weather.' });
  }
});

// Create a new user
app.post('/api/auth/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !email.trim() ||
      typeof password !== 'string' ||
      password.length < 8
    ) {
      return res.status(400).send({
        message: 'Enter a name, email, and password of at least 8 characters.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await userCollection.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).send({
        message: 'Email already registered.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
    };

    await userCollection.insertOne(user);

    const token = uuidv4();

    await sessionsCollection.insertOne({
      token,
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
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({
      message: 'Unable to create account.',
    });
  }
});

// Login an existing user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).send({
        message: 'Email and password are required.',
      });
    }

    const user = await userCollection.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).send({
        message: 'Invalid email or password.',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).send({
        message: 'Invalid email or password.',
      });
    }

    const token = uuidv4();

    await sessionsCollection.insertOne({
      token,
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({
      message: 'Unable to log in.',
    });
  }
});

// Verify that the user is authenticated
async function verifyAuth(req, res, next) {
  try {
    const token = req.cookies[authCookieName];

    if (!token) {
      return res.status(401).send({
        message: 'You must be logged in.',
      });
    }

    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.status(401).send({
        message: 'You must be logged in.',
      });
    }

    const user = await userCollection.findOne({
      email: session.email,
    });

    if (!user) {
      return res.status(401).send({
        message: 'User not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Log out the user
app.delete('/api/auth/logout', verifyAuth, async (req, res) => {
  try {
    const token = req.cookies[authCookieName];

    await sessionsCollection.deleteOne({ token });

    res.clearCookie(authCookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.send({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).send({
      message: 'Unable to log out.',
    });
  }
});

// Check whether the user is logged in
app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.send({
    name: req.user.name,
    email: req.user.email,
  });
});

// Get all clothing items for the logged-in user
app.get('/api/clothes', verifyAuth, async (req, res) => {
  try {
    const userClothes = await clothesCollection
      .find({ userEmail: req.user.email })
      .toArray();

    res.send(userClothes);
  } catch (error) {
    console.error('Error retrieving clothes:', error);
    res.status(500).send({
      message: 'Unable to retrieve clothes.',
    });
  }
});

// Add a clothing item
app.post('/api/clothes', verifyAuth, async (req, res) => {
  try {
    const newClothing = {
      id: uuidv4(),
      userEmail: req.user.email,
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
      brand: req.body.brand,
      image: req.body.image,
    };

    await clothesCollection.insertOne(newClothing);

    res.send(newClothing);
  } catch (error) {
    console.error('Error saving clothing:', error);
    res.status(500).send({
      message: 'Unable to save clothing item.',
    });
  }
});

// Delete a clothing item
app.delete('/api/clothes/:id', verifyAuth, async (req, res) => {
  try {
    const result = await clothesCollection.deleteOne({
      id: req.params.id,
      userEmail: req.user.email,
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: 'Clothing item not found.',
      });
    }

    res.send({ message: 'Clothing item removed.' });
  } catch (error) {
    console.error('Error deleting clothing:', error);
    res.status(500).send({
      message: 'Unable to delete clothing item.',
    });
  }
});

// Get all outfits for the logged-in user
app.get('/api/outfits', verifyAuth, async (req, res) => {
  try {
    const userOutfits = await outfitsCollection
      .find({ userEmail: req.user.email })
      .toArray();

    res.send(userOutfits);
  } catch (error) {
    console.error('Error retrieving outfits:', error);
    res.status(500).send({
      message: 'Unable to retrieve outfits.',
    });
  }
});

// Get planned outfits
app.get('/api/planned-outfits', verifyAuth, async (req, res) => {
  try {
    const result = await plannedOutfitsCollection.findOne({
      userEmail: req.user.email,
    });

    res.send(result?.plans || {});
  } catch (error) {
    console.error('Error retrieving planned outfits:', error);
    res.status(500).send({ message: 'Unable to retrieve plans.' });
  }
});


// Retrieve messages involving the logged-in user
app.get('/api/messages', verifyAuth, async (req, res) => {
  try {
    const messages = await messagesCollection
      .find({
        $or: [
          { senderEmail: req.user.email },
          { recipientEmail: req.user.email },
        ],
      })
      .sort({ createdAt: 1 })
      .toArray();

    res.send(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).send({ message: 'Unable to retrieve messages.' });
  }
});

// Send a message
app.post('/api/messages', verifyAuth, async (req, res) => {
  try {
    const { recipientEmail, text } = req.body;

    if (
      typeof recipientEmail !== 'string' ||
      typeof text !== 'string' ||
      !text.trim()
    ) {
      return res.status(400).send({ message: 'Invalid message.' });
    }

    const recipient = recipientEmail.trim().toLowerCase();

    if (!recipient) {
      return res.status(400).send({ message: 'Recipient is required.' });
    }

    const recipientUser = await userCollection.findOne({
      email: recipient,
    });

    if (!recipientUser) {
      return res.status(404).send({ message: 'Recipient not found.' });
    }

    const message = {
      id: uuidv4(),
      senderEmail: req.user.email,
      recipientEmail: recipient,
      text: text.trim(),
      createdAt: new Date(),
    };

    await messagesCollection.insertOne(message);

    res.status(201).send(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ message: 'Unable to send message.' });
  }
});

// Save planned outfits
app.put('/api/planned-outfits', verifyAuth, async (req, res) => {
  try {
    const plans = req.body.plans;

    if (!plans || typeof plans !== 'object' || Array.isArray(plans)) {
      return res.status(400).send({ message: 'Invalid plans.' });
    }

    await plannedOutfitsCollection.updateOne(
      { userEmail: req.user.email },
      { $set: { plans } },
      { upsert: true }
    );

    res.send({ message: 'Planner saved successfully.' });
  } catch (error) {
    console.error('Error saving planned outfits:', error);
    res.status(500).send({ message: 'Unable to save plans.' });
  }
});

// Create a new outfit
app.post('/api/outfits', verifyAuth, async (req, res) => {
  try {
    const newOutfit = {
      id: uuidv4(),
      userEmail: req.user.email,
      name: req.body.name,
      items: req.body.items,
    };

    await outfitsCollection.insertOne(newOutfit);

    res.send(newOutfit);
  } catch (error) {
    console.error('Error saving outfit:', error);
    res.status(500).send({
      message: 'Unable to save outfit.',
    });
  }
});

// Delete an outfit
app.delete('/api/outfits/:id', verifyAuth, async (req, res) => {
  try {
    const result = await outfitsCollection.deleteOne({
      id: req.params.id,
      userEmail: req.user.email,
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: 'Outfit not found.',
      });
    }

    res.send({ message: 'Outfit removed.' });
  } catch (error) {
    console.error('Error deleting outfit:', error);
    res.status(500).send({
      message: 'Unable to delete outfit.',
    });
  }
});

const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(fs.existsSync(publicPath) ? publicPath : distPath));

// Start server
async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();