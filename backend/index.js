import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import hotel from "./data/hotel.js";
import products from "./data/products.js";

const port = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/OHMS", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/rooms", (req, res) => {
    res.json(hotel);
});

app.get("/rooms/:roomId", (req, res) => {
    const room = hotel.find((r) => r.id === parseInt(req.params.roomId));
    res.json(room);
});

app.listen(port, () => console.log(`Port is running in ${port}`));
