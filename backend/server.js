// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const players = [
    { id: 1, name: 'Marc Gasol', position: 'Center', yearsWithGrizzlies: 11 },
    { id: 2, name: 'Mike Conley', position: 'Point Guard', yearsWithGrizzlies: 12 },
    { id: 3, name: 'Zach Randolph', position: 'Power Forward', yearsWithGrizzlies: 8 },
    { id: 4, name: 'Shareef Abdur-Rahim', position: 'Point Guard', yearsWithGrizzlies: 5 },
    { id: 5, name: 'Pau Gasol', position: 'Power Forward', yearsWithGrizzlies: 7 },
    { id: 6, name: 'Mike Miller', position: 'Small Forward', yearsWithGrizzlies: 6 },
];

app.use(cors());
app.use(express.json());

// Route to get all players
app.get('/api/players', (req, res) => {
    res.json(players);
});

// Route to get a specific player by ID
app.get('/api/players/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const player = players.find(player => player.id === id);
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
