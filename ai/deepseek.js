const axios = require('axios');
require('dotenv').config();

async function getDescriptionWithDeepSeek(text) {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Ubah teks HTML berikut menjadi deskripsi produk eBay yang rapi:\n\n${text}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error dari DeepSeek:", error.response?.data || error.message);
    return "[Deskripsi gagal diproses oleh DeepSeek]";
  }
}

module.exports = { getDescriptionWithDeepSeek };
