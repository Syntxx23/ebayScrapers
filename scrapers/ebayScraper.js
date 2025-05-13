const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const { getDescriptionWithDeepSeek } = require('../ai/deepseek');

async function getProductDescription(link) {
  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    const rawText = $('#viTabs_0_is').text().trim() || $('#vi-desc-maincntr').text().trim() || '-';
    if (rawText === '-') return '-';

    const description = await getDescriptionWithDeepSeek(rawText);
    return description;
  } catch (err) {
    console.error('Gagal ambil deskripsi dari eBay:', err.message);
    return '-';
  }
}


async function scrapeEbay(keyword, max = 5) {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${keyword}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const products = [];
  const items = $('.s-item');

  for (let i = 0; i < items.length && products.length < max; i++) {
    const el = items[i];
    const name = $(el).find('.s-item__title').text().trim();
    if (!name || name === 'Shop on eBay') continue;

    const priceText = $(el).find('.s-item__price').text().trim() || '-';
    const link = $(el).find('.s-item__link').attr('href') || '-';

    const description = await getProductDescription(link);

    products.push({ name, price: priceText, description });
  }

  return products;
}
module.exports = { getDescriptionWithDeepSeek, scrapeEbay };