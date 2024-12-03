const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  totalAmount: Number,
  qrCode: String,
  status: { type: String, default: 'pending' },
  paidBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);