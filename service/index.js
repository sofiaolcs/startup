const express = require('express');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Parse JSON request bodies
app.use(express.json());

// Test endpoint
app.get('/api/hello', (_req, res) => {
  res.send({ message: 'Welcome to Passarela!' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});