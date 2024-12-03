const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  qrCode: String, // Para identificar cobranças geradas
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
