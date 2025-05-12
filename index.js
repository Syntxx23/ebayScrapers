require('dotenv').config();
const express = require('express');
const { scrapeEbay } = require('./scrapers/ebayScraper');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const keyword = req.query.q || 'nike';

  try {
    const data = await scrapeEbay(keyword);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal scraping', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API aktif di http://localhost:${PORT}`);
});
