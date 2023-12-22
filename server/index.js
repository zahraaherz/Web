import dotenv from 'dotenv';

// Loading environment variables from .env file
dotenv.config();

import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';
//Routes
import productRoutes from './routes/productRoutes.js'


connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);


const port = process.env.PORT || 5000;

// Check if the backend is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
