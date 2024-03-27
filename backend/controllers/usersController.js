import User from '../model/userModel.js';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';

dotenv.config();

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export async function registerUser(req, res , next) {
    try {
        if (!req.body.email.match(emailRegex)) {
            throw new Error('Email is not valid');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        return res.status(StatusCodes.ACCEPTED).json({ data: req.body, message: 'Succesfully Created' });
    } catch (error) {
        next({status:StatusCodes.NOT_ACCEPTABLE, message: error.message});
    }
}

export async function loginUser(req, res , next) {
    try {
        const userAuth = await User.findOne({ email: req.body.email });
        if (!userAuth) {
            throw new Error("Email doesn't exist");
        } else {
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                userAuth.password
            );
            if (!passwordMatch) {
                throw new Error("Wrong Password");
            }
            const secretKey = process.env.SECRET;
            const accessToken = jwt.sign(
                {
                    userId: userAuth._id,
                },
                secretKey,
                { expiresIn: '400m' }
            );
            return res.status(StatusCodes.ACCEPTED).json({ data: accessToken , message: 'Succesfully Signed in' });
        }
        
    } catch (error) {
        next({status:StatusCodes.NOT_FOUND, message: error.message});
    }
}

export async function wrongUrl(req, res) {
    res.status(StatusCodes.BAD_REQUEST).json({ data: null, message: "Wrong url" })
}