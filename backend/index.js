import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import roomsRouter from "./routes/roomsRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import bookingRouter from "./routes/bookingsRoutes.js";
import billingRouter from "./routes/billingsRoutes.js";
import imgRouter from "./routes/imgRoutes.js";
import path from 'path';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/OHMS");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/rooms", roomsRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/billings", billingRouter);
app.use("/uploads", imgRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
