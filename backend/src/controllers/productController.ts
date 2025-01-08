import { Request, Response } from 'express';
import {create} from "../models/Product";

/*export async function getAllProducts(){
    try {
        await
    }
}*/

export async function addProduct(req: Request, res: Response){
    const {name, price} = req.body;

    if (!name || !price) return res.status(400).json({error: "All fields required"});

    try{
        await create({name, price});
    } catch (error){
        console.log(error);
        res.status(500).json({error: "Server error during adding product"});
    }
}

