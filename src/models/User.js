const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ['restaurant', 'consumer'], default: 'consumer' },
}, { timestamps: true });

// M�todo para validar senha
// userSchema.methods.validatePassword = function (password) {
//   return bcrypt.compare(password, this.passwordHash);
// };

module.exports = mongoose.model('User', userSchema);
