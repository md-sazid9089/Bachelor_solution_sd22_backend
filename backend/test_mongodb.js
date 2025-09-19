const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ message: String });
    const Test = mongoose.model('Test', testSchema);
    
    const testDoc = new Test({ message: 'Hello from test!' });
    await testDoc.save();
    console.log('✅ Successfully created test document!');
    
    // Clean up
    await Test.deleteMany({});
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Connection closed.');
  }
}

testConnection();