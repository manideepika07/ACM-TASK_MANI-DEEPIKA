const express = require('express');
const { nanoid } = require('nanoid');
const { hostname } = require('node:os');
const app = express();
const PORT = 5000;

let urlDatabase = [];

app.use(express.json());
app.use(express.static('public'));

app.post('/api/shorten', (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(6);
  const shortUrl='${req.protocol}://${req.headers.host}/${shortId}';
  urlDatabase.push({ shortId, longUrl, shortUrl, clicks: 0 });
  res.json({ shortUrl });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const urlEntry = urlDatabase.find(entry => entry.shortId === shortId);
  if (urlEntry) {
    urlEntry.clicks++;
    res.redirect(urlEntry.longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.get('/api/urls', (req, res) => {
  res.json(urlDatabase);
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});