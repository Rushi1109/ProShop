import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoute.js';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config({path: '.env'});
connectDB();

const app = express();
app.use(morgan('common'));
app.use("/api/products", productRouter);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// API testing
app.get('/', (req,res) => {
    res.send(`Api is running`);
});

// Run Server on given PORT
app.listen(process.env.PORT, console.log(`Server Running on port ${process.env.PORT}`));