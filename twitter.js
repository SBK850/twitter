const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // CORS for all routes
app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body;

    //oEmbed URL by directly encoding the tweet URL
    const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&widget=Tweet`;

    try {
        const response = await axios.get(twitterOEmbedUrl, {
            headers: {
                'User-Agent': 'Your App Name' // Replace with your actual app name or something descriptive
            }
        });

        // respond with the embed code and the requested URL for verification
        res.json({
            html: response.data.html,
            requestedUrl: url
        });
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error.message);

        res.status(500).json({
            error: 'Failed to fetch Twitter embed code',
            message: error.message,
            requestedUrl: url // Including the requested URL in the error response for verification
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
