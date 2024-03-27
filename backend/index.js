import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import dbConnection from './config/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);
app.use((error , req, res , next) => {
    res.status(error.status).json({data:null , message:error.message});
})
dbConnection();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
