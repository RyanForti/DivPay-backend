const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
const PORT = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor Node.js ativo!');
});


// Rotas
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

// Conex�o com MongoDB
mongoose.connect('mongodb+srv://root:hSfwAWYBwc20Fc2v@divpay.oyffy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  // app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  });
}).catch(err => console.error('MongoDB connection error:', err));