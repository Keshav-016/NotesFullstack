import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET;

const validateToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    throw new Error("User is not authorized");
                }
                req.userId = decoded.userId;
                next();
            });
        } else {
            throw new Error("Token is missing!!!");
        }
    } catch (error) {
        next({status:StatusCodes.UNAUTHORIZED , message:error.message})
    }
};

export default validateToken;
