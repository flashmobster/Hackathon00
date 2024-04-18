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
const TEAM_ID = 15;

// Route to get players from the initial page
app.get('/page1', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=${TEAM_ID}`, {
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

// Route to get players from the second page
app.get('/page2', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=${TEAM_ID}&cursor=17895899`, {
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

// Route to get all players
app.get('/all', async (req, res) => {
    try {
        const page1Response = await axios.get(`http://localhost:${port}/page1`);
        const page2Response = await axios.get(`http://localhost:${port}/page2`);
        const allPlayers = [...page1Response.data, ...page2Response.data];
        res.json(allPlayers);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Failed to fetch players' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
