const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body;
    // No double encoding, the URL should be encoded only once
    const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&widget=Tweet`;

    try {
        const response = await axios.get(twitterOEmbedUrl, {
            headers: {
                'User-Agent': 'Your App Name'
            }
        });

        res.json({
            html: response.data.html,
            requestedUrl: url // Send back the original URL for verification
        });
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error);

        res.status(500).json({
            error: 'Failed to fetch Twitter embed code',
            message: error.message,
            requestedUrl: url // Send back the original URL for verification
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
