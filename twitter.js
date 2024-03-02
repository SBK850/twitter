const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/get-twitter-embed', async (req, res) => {
    const { url } = req.body;
    const encodedUrl = encodeURIComponent(url);
    const twitterOEmbedUrl = `https://publish.twitter.com/oembed?url=${encodedUrl}&widget=Tweet`;

    try {
        const response = await axios.get(twitterOEmbedUrl, {
            headers: {
                'User-Agent': 'Your App Name' // Replace with your actual app name or something descriptive
            }
        });

        res.json({
            html: response.data.html,
            requestedUrl: twitterOEmbedUrl // Including the requested URL in the response
        });
    } catch (error) {
        console.error('Error fetching Twitter embed code:', error.message);

        let errorDetails = {};
        if (error.response) {
            // The server responded with a status code that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            errorDetails = {
                details: error.response.data,
                status: error.response.status,
            };
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
            errorDetails = {
                error: 'No response received when fetching Twitter embed code',
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            errorDetails = {
                error: 'Error setting up request to Twitter API',
                message: error.message,
            };
        }

        res.status(500).json({
            error: 'Failed to fetch Twitter embed code',
            ...errorDetails,
            requestedUrl: twitterOEmbedUrl // Including the requested URL in the error response
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
