const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.BDL_API_KEY;
const PER_PAGE = 100; // Number of players per page


app.get('/players', async (req, res) => {
    try {
        const cursor = req.query.cursor || ''; // Get cursor from the query
        const url = cursor ? `https://api.balldontlie.io/v1/players?per_page=${PER_PAGE}&team_ids[]=15&cursor=${cursor}` : `https://api.balldontlie.io/v1/players?per_page=${PER_PAGE}&team_ids[]=15`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `${API_KEY}`
            }
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Failed to fetch players' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
