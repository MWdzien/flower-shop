import { Request, Response } from 'express';
import {createUser, getUserByEmail, updateUserPassword} from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "supersekretnyklucz123";

export async function registerUser(req: Request, res: Response){
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({error: "All fields required"})

    try {
        const user = await getUserByEmail(email);

        if (user){
            return res.status(400).json({error: "User with given email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser({email: email, password: hashedPassword, role: "user"});

        res.status(201).json({message: "Registered successfully"})
    } catch (error){
        console.log(error);
        res.status(500).json({error: "Server error during registration"});
    }
}

export async function loginUser(req: Request, res: Response) {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({error: "All fields required"});

    try{
        const user = await getUserByEmail(email);

        if (!user){
            return res.status(400).json({error: "User with given email does not exists"});
        }

        if (!await bcrypt.compare(password, user.password)){
            return res.status(401).json({error: "Invalid password"});
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            JWT_SECRET,
            {expiresIn: "4h"}
        );

        res.json({token, role: user.role, message: "Logged in successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error during logging in"});
    }
}

export async function updatePassword(req: Request, res: Response){
    const {email, prevPassword, newPassword} = req.body;

    if (!prevPassword || !newPassword) return res.status(400).json({error: "All fields required"});

    if (prevPassword === newPassword) return res.status(400).json({error: "New password can not be the same as the previous one"});

    try {
        const user = await getUserByEmail(email);

        if (!user){
            return res.status(400).json({error: "User with given email does not exists"});
        }

        if (!await bcrypt.compare(prevPassword, user.password)){
            return res.status(401).json({error: "Invalid password"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await updateUserPassword(email, hashedPassword);

        res.status(204).json({message: "Password updated successfully"})
    } catch (error){
        console.log(error);
        res.status(500).json({error: "Server error during updating password"});
    }
}

export async function removeUser(req: Request, res: Response){
    const email = req.body;

    if (!email) return res.status(400).json({error: "Email required"});

    try {
        const user = await getUserByEmail(email);

        if (!user){
            return res.status(400).json({error: "User with given email does not exists"});
        }

        res.status(200).json({message: "User deleted successfully"})
    } catch (error){
        console.log(error);
        res.status(500).json({error: "Server error during updating password"});
    }
}