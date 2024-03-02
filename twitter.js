const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body; // This URL should be the full Twitter URL, not the encoded one
    try {
        const encodedUrl = encodeURIComponent(url);
        const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodedUrl}&widget=Tweet`;
        const response = await axios.get(twitterOEmbedUrl);

        res.json({ html: response.data.html });
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error);
        res.status(500).json({ error: 'Failed to fetch Twitter embed code' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
