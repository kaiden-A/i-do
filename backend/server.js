import './config/env.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import errorHandler from './middleware/errorHandler.js';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin : process.env.FRONTEND_URL  || 'http://localhost:5173',
    methods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

const PORT = process.env.PORT || 5000;

app.get('/' , (req , res) => {
    console.log('opening website')
})

app.use('/api' ,  authRoutes);
app.use(errorHandler);


app.listen(PORT , "0.0.0.0" , () => console.log(`APP is listening at PORT ${PORT}`));
