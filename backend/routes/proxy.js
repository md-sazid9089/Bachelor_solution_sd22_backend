const express = require('express');
const axios = require('axios');
const router = express.Router();

// Simple image proxy to bypass hotlink restrictions
router.get('/image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send('Missing url');
  }

  try {
    const parsed = new URL(imageUrl);
    if (!/^https?:$/.test(parsed.protocol)) {
      return res.status(400).send('Invalid protocol');
    }

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': parsed.origin
      },
      timeout: 10000,
      maxContentLength: 5 * 1024 * 1024 // 5 MB
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(response.data, 'binary'));
  } catch (err) {
    console.error('Image proxy error:', err.message);
    res.status(502).send('Failed to fetch image');
  }
});

module.exports = router;
