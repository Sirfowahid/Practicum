import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import roomsRouter from "./routes/roomsRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import bookingRouter from "./routes/bookingsRoutes.js";
import billingRouter from "./routes/billingsRoutes.js"
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
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/rooms", roomsRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/billings",billingRouter)


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
