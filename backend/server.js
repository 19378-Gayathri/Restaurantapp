const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL || '*'
  ]
}));
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => res.send('FoodieHub API is running'));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
