const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  qrCode: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  paymentMethods: [
    {
      type: { type: String },
      details: mongoose.Schema.Types.Mixed,
    },
  ],
}, { timestamps: true });

// Método para validar senha
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
