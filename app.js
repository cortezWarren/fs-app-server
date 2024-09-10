const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth');
const protectedRoute = require('./src/routes/protectedRoute');
const { connectToDatabase, getDatabase, closeConnection } = require('./src/helpers/dbHelper');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
      const db = await connectToDatabase();
      const collection = db.collection('users'); // Replace with your collection name
      const data = await collection.find().toArray();
      res.json(data);
  } catch (err) {
      res.status(500).send('Error fetching data from MongoDB');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close MongoDB connection when the application is terminated
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit();
});