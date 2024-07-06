import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import hotel from "./data/hotel.js";
import bookings from "./data/bookingData.js"
import users from "./data/bookingData.js"
import roomsRouter from "./routes/roomsRoutes.js"
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

//app.use(roomsRouter)

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

app.get("/users",(req,res)=>{
    res.json(users)
})

app.get("/users/:userId",(req,res)=>{
    const user = users.find((u)=>u.id ===parseInt(req.params.userId))
    res.json(user)
})

app.get("/bookings",(req,res)=>{
    res.json(bookings)
})

app.get("/bookings/:bookingId",(req,res)=>{
    const booking = bookings.find((b)=>b.id ===parseInt(req.params.bookingId))
    res.json(booking)
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Port is running in ${port}`));
