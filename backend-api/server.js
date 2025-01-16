const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const itemsRoutes = require('./routes/items');
app.use('/items', itemsRoutes);

// Root route - ADD THIS
app.get('/', (req, res) => {
    res.send('Welcome to the Collection Manager API!'); // Or send some JSON
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));