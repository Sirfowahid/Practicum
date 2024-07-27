import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, "mySecretKey");
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, Invalid Token");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, No Token");
    }
});

const admin = (req,res,nest) =>{
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error("Not Authorized as Admin!")
    }
}

export { protect,admin };
