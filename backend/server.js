const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.BDL_API_KEY;

// Route to get players from the BallDontLie API
app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=15", {
            headers: {
                Authorization: `${API_KEY}`
            }
        });
        res.json(data);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Failed to fetch players' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
