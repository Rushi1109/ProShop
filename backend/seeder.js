import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config({path: '.env'});
connectDB();

const importData = async () => {
    try {
        // Clear old records
        await Order.deleteMany();                
        await Product.deleteMany();
        await User.deleteMany();

        // Adding Users data to mongoDB
        const createdUsers = await User.insertMany(users);
        // Getting admin user
        const adminUser = createdUsers[0]._id;

        // Adding admin User attribute to all the products
        const sampleProducts = products.map(product => {
            return { ...product, user:adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log(`Data Imported`);
        process.exit();
    } catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear old records
        await Order.deleteMany();                
        await Product.deleteMany();
        await User.deleteMany();

        console.log(`Data destroyed`);
        process.exit();
    } catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
};


// Node backend/seeder -d
if(process.argv[2] === '-d'){
    destroyData();
}
// Node backend/seeder
else{
    importData();
}