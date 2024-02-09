import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

const port = 5000;

// app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));
app.get('/api/config/google', (req, res) => {
	try {
	  if (!process.env.GOOGLE_CLIENT_ID) {
		throw new Error('Google Client ID not found.');
	  }
  
	  res.send(process.env.GOOGLE_CLIENT_ID);
	} catch (error) {
	  console.error('Error retrieving Google Client ID:', error.message);
	  res.status(500).send('Internal Server Error');
	}
  });
  
app.get('/', (req, res) => {
	res.send('Api is running...');
});

app.listen(port, () => {
	console.log(`Server runs on port ${port}`);
});