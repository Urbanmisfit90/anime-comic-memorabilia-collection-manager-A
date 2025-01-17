import express from 'express';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRoutes from './routes/items';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/items', itemsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
