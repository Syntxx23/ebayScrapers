const axios = require('axios');
const cheerio = require('cheerio');

async function getProductDescription(link) {
  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    // Ambil deskripsi dari bagian produk (kadang beda-beda)
    const description = $('#viTabs_0_is').text().trim() || 
                        $('#vi-desc-maincntr').text().trim() || 
                        $('#vi-desc-maincntr').find('div').text().trim() || 
                        '-';

    return description;
  } catch (err) {
    return '-';
  }
}

async function scrapeEbay(keyword) {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${keyword}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const products = [];

  const items = $('.s-item').slice(0, 5); // batasi hanya 5 dulu untuk tes

  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    const name = $(el).find('.s-item__title').text() || '-';
    const price = $(el).find('.s-item__price').text() || '-';
    const link = $(el).find('.s-item__link').attr('href') || '-';

    const description = await getProductDescription(link);

    products.push({ name, price, link, description });
  }

  return products;
}
module.exports = { scrapeEbay };