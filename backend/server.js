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

// Route to get players from the BallDontLie API
app.get('/players', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=15", {
            headers: {
                Authorization: `${API_KEY}`
            }
        });

        const { data: data2 } = await axios.get("https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=15&cursor=17895899", {
            headers: {
                Authorization: `${API_KEY}`
            }
        });
        
        const combinedData = [...data.data, ...data2.data];
        
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching player info:', error.message);
        res.status(500).json({ error: 'Failed to fetch player info' });
    }
});
const options = {
    method: 'GET',
    url: 'https://allsportsapi2.p.rapidapi.com/api/basketball/team/3415/media',
    headers: {
      'X-RapidAPI-Key': '940b645e1cmsha9da1e791868fddp11e0bejsn0d94bbd9fa24',
      'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
    }
  };
  
  app.get('/highlights', async (req, res) => {
    try {
      const response = await axios.request(options);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// POST route for creating a new player
app.post('/players', async (req, res) => {
    try {
        const newPlayer = req.body; 
        // Logic to save the new player to your database or API
        res.status(201).json({ message: 'Player created successfully', player: newPlayer });
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({ message: 'Failed to create player' });
    }
});

// PUT route for updating an existing player
app.put('/players/:id', async (req, res) => {
    const playerId = req.params.id;
    try {
        const updatedPlayerData = req.body; // Assuming the request body contains the updated player data
        // Logic to update the player in your database or API
        res.json({ message: 'Player updated successfully', player: updatedPlayerData });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ message: 'Failed to update player' });
    }
});

// DELETE route for deleting a player
app.delete('/players/:id', async (req, res) => {
    const playerId = req.params.id;
    try {
        // Logic to delete the player from your database or API
        res.json({ message: 'Player deleted successfully', playerId: playerId });
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({ message: 'Failed to delete player' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
