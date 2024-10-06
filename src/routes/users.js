const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../helpers/dbHelper');

router.get('/users', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    console.log(users);
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;