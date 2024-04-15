
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'GET request received' });
});

app.post('/api/data', (req, res) => {
    res.json({ message: 'POST request received' });
});

app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `PUT request received for ID: ${id}` });
});

app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `DELETE request received for ID: ${id}` });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
