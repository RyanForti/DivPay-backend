const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // IDs dos membros do grupo
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  splitAmounts: {
    type: Map,
    of: Number, // Armazena quanto cada membro do grupo deve pagar
    required: true,
  },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
