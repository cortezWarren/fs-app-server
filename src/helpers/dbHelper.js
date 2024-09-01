const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://plantastic:EIJnPnHQHwHsk2T6@cluster0.vyyebuq.mongodb.net/plantastic?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let db = null;

const connectToDatabase = async () => {
    try {
        if (db) return db; // Return the existing connection if already connected
        
        await client.connect();
        console.log('Connected to MongoDB');
        
        db = client.db('plantastic');
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
};

const closeConnection = async () => {
    try {
        if (client.isConnected()) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    } catch (err) {
        console.error('Error closing MongoDB connection', err);
    }
};

module.exports = {
    connectToDatabase,
    getDatabase,
    closeConnection,
};
