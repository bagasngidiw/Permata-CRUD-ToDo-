const { MongoClient } = require('mongodb');


async function connectToMongoDB() {
    const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      // Export the connected client or database if needed
      return client;
  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
  
    }
}
  
  module.exports = {
    connectToMongoDB
  };
  