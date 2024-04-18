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

// Route to get players from the BallDontLie API
app.get('/', async (req, res) => {
    try {
        let allPlayers = [];
        let page = 1;
        let totalPages = 1; // page one to begin

        // Fetch all pages of players
        while (page <= totalPages) {
            const { data } = await axios.get(`https://api.balldontlie.io/v1/players`, {
                params: {
                    per_page: 100,
                    team_ids: TEAM_ID,
                    page: page
                },
                headers: {
                    Authorization: `${API_KEY}`
                }
            });

            allPlayers = [...allPlayers, ...data.data];
            totalPages = data.meta.total_pages;
            page++;
        }

        res.json(allPlayers);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Failed to fetch players' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
