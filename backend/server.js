import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({path: '.env'});
connectDB();

const app = express();

// API testing
app.get('/', (req,res) => {
    res.send(`Api is running`);
});

app.get('/api/products', (req,res) => {
    res.json(products);
});

app.get('/api/products/:id', (req,res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
});

// Run Server on given PORT
app.listen(process.env.PORT, console.log(`Server Running on port ${process.env.PORT}`));