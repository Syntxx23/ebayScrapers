require('dotenv').config();
const express = require('express');
const { scrapeEbay } = require('./scrapers/ebayScraper');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/hallo', async (req, res) => {
  const keyword = req.query.q || 'nike';
  const max = parseInt(req.query.max) || 5; // default ambil 5 produk

  try {
    const data = await scrapeEbay(keyword, max);

    // Hitung total cost dari price yang dalam format string (contoh: IDR1,156,000.00)
    let totalCost = 0;
    for (const item of data) {
      const priceStr = item.price.replace(/[^0-9.,]/g, '').replace(',', ''); // ambil angka saja
      const price = parseFloat(priceStr);
      if (!isNaN(price)) {
        totalCost += price;
      }
    }

    res.json({
      success: true,
      count: data.length,
      total_cost: totalCost.toFixed(2),
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Gagal scraping',
      error: err.message
    });
  }
});
app.listen(PORT, () => {
  console.log(`API aktif di http://localhost:${PORT}`);
});

