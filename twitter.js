const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body;
    try {
        const encodedUrl = encodeURIComponent(url);
        const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodedUrl}&widget=Tweet`;
        const response = await axios.get(twitterOEmbedUrl);

        res.setHeader('Content-Type', 'text/html');
        res.send(response.data.html);
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error);
        res.status(500).json({ error: 'Failed to fetch Twitter embed code' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
