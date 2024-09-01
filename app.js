const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

// const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/test', (req, res) => {
    res.send('Test route is working!');
});

module.exports = router;  // Ensure this line exports the router



const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// Read all files in the 'routes' directory and load them
readdirSync('./routes').filter(file => file.endsWith('.js')).map((file) => {
    app.use('/api/v1', require('./routes/' + file));
});


const server = () => {
    db(); // Initialize the database connection
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();
