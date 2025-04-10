const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000; // meow
const API_KEY = process.env.API_KEY;

app.get('/now-playing', async (req, res) => {
  const USERNAME = 'koltontheshek';
  const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.json(data); // Send the data back to the client
  } catch (error) {
    console.error('Error fetching data from Last.fm:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});