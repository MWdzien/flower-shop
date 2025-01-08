import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "supersekretnyklucz123";

export function authenticateToken(req: Request, res: Response){

}