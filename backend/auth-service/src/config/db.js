const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/auth-service', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected for auth-service');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;