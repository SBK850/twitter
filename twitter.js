const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body;
    try {
        const encodedUrl = encodeURIComponent(url);
        const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodedUrl}&widget=Tweet`;
        const response = await axios.get(twitterOEmbedUrl);

        res.json({ html: response.data.html });
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error.message);

        if (error.response) {

            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            res.status(500).json({
                error: 'Failed to fetch Twitter embed code',
                details: error.response.data,
                status: error.response.status,
            });
        } else if (error.request) {

          console.error('Request error:', error.request);
            res.status(500).json({
                error: 'No response received when fetching Twitter embed code',
            });
        } else {

          console.error('Error message:', error.message);
            res.status(500).json({
                error: 'Error setting up request to Twitter API',
                message: error.message,
            });
        }
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
