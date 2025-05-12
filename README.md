# 🛍️ eBay AI Scraper API

API ini dibuat dengan Node.js, Express, Axios, dan Cheerio untuk melakukan **web scraping produk eBay berdasarkan kata kunci**.

---

## 🚀 Cara Menjalankan

### 1. Clone Proyek (jika dari GitHub)
```bash
git clone https://github.com/username/ebay-ai-scraper.git
cd ebaySrapers
# jika anda ingin membuka nya di mac download 
nvm use 24.10.0
###  install semua depedensi
npm install
# Jalankan api
node index.js
# Cara menggunakan API
GET /
#contoh data
{
  "success": true,
  "count": 5,
  "data": [
    {
      "name": "Shop on eBay",
      "price": "$20.00",
      "link": "https://ebay.com/itm/123456?itmmeta=012DEW30YG0MEEKND7NH&hash=item123546:g:acwAA9KNiJowH:sc:ShippingMethodStandard!95008!US!-1&itmprp=enc%3AbgepL1tlUHjMGCVfSTGJh%2BzsVKeJ3CQk7NizDI4BZeppuFnmyS6Ijyp8lh%2FnEw%2BWqO7uTV1Q6izE1R0T54aV8j71F4xlWfVcGft4%2FiOQhtqVXA1rW6M1atPARQRmhqUxtEPJKhKtSFgI%2Bvwlzb0GwVCtkp%3ABlBMUObkmabpYw",
      "description": "-"
    }
  ]
}
### 2.

