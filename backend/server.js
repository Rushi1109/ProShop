import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

const app = express();

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

app.listen(process.env.PORT, console.log(`Server Running on port ${process.env.PORT}`));