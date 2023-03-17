import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import usersRouter from './routes/users.routes.js';

dotenv.config();

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB!');
    } catch (err) {
        console.error(err);
    }
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/v1/users', usersRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}...`);
});
