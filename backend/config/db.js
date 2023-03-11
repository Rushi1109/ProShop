import mongoose from 'mongoose';

// Function for connection to database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(`Error: ${e}`);
        process.exit(1);
    }
}

export default connectDB;