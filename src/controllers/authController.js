const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if (!user || !(await user.validatePassword(password))) {
    if (!user || user.password != password){  
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    //res.json({ token });
    res.jons({userId: user._id, userType: user.type});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user ){  
      const user = await User.create({name, email, password});
      user.save();
      res.status(200).json({ userId: user._id, userName: user.name, userEmail: user.email});
    } else {
      return res.status(400).json({message: 'E-mail already in use'})
    }

    res.jons({userId: user._id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


};
