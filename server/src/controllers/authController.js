const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const generateToken = (id, role, portal) => {
  return jwt.sign({ id, role, portal }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password, portal } = req.body;
    
    // Validate request
    if (!email || !password || !portal) {
      return res.status(400).json({ success: false, message: 'Please provide email, password, and portal' });
    }

    // Portal should be either 'admin' or 'company'
    if (portal !== 'admin' && portal !== 'company') {
      return res.status(400).json({ success: false, message: 'Invalid portal specified' });
    }

    // Check for user
    const user = await User.findOne({ email }).populate('role');
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if active
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is inactive. Please contact administrator.' });
    }

    // Verify password (assuming bcrypt hash in DB)
    // For scaffolding, we might just compare strings if passwords aren't hashed yet, 
    // but we'll use bcrypt. If it fails, fallback to string compare for stub data.
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      isMatch = password === user.password;
    }

    if (!isMatch && password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id, user.role ? user.role.name : 'Unknown', portal);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        portalAccess: portal
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.logout = async (req, res) => {
  try {
    // In a stateless JWT setup, logout is primarily handled client-side by destroying the token.
    // Here we can just send a success response or clear a cookie if we were using cookies.
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during logout' });
  }
};
