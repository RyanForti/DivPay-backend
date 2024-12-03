const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

// Conexão com MongoDB
mongoose.connect('mongodb+srv://root:hSfwAWYBwc20Fc2v@divpay.oyffy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => console.error('MongoDB connection error:', err));