import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;

export default async function dbConnection() {
    mongoose.connect(URL);

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        mongoose.connection.close();
        process.exit(1);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}
