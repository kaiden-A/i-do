import './config/env.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import errorHandler from './middleware/errorHandler.js';
import sendEmail from './utils/sendEmail.js';

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
  res.json({message : "Opening website"})
})

app.get("/test-email", async (req, res) => {
  await sendEmail({
    to: "amirikhwanfaisal@gmail.com",
    subject: "Brevo test",
    html: "<p>Brevo SMTP works 🎉</p>"
  });

  res.json({msg : "Email sent"});
});

app.use('/api' ,  authRoutes);
app.use(errorHandler);


app.listen(PORT , "0.0.0.0" , () => console.log(`APP is listening at PORT ${PORT}`));
