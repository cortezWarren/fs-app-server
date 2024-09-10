require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../helpers/dbHelper');

const users = [
  {
    id: 1,
    name: "Juan",
    password: "$2b$10$CXOz6PdY0h1q3FeeU8Vgje3.6N3yDCuXc8/MNSbfkrfo.X5W8GQl6"
  },
  {
    id: 2,
    name: "Pedro",
    password: "$2b$10$/Ok0VoifxDNxA2beFp/igeVdX/j1qVsMVdKBcgHxLx5jOOGkGWOay"
  },
  {
    id: 7,
    name: "Tom",
    password: "$2b$10$4CCCo4rZwr6U4rK/bF4X3uQKq4N.jmr1AhwHjvvI085R2yxjuUv92"
  }
];
// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    const user = db.collection('users');
    await user.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username });
    console.log('user', user);
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('user.password', user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;