const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
  };
  
// Register a new user
const register = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    try {
      const user = new User({ username, email, password, isAdmin });
      await user.save();
      res.status(201).json({ token: generateToken(user._id, user.isAdmin) });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        res.json({ token: generateToken(user._id, user.isAdmin) });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Password reset (for simplicity, no email verification here)
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, resetPassword }