import pool from "../database/db";
import {User} from "./User";

export interface Product{
    id: number,
    name: string,
    price: number
}

export async function getAll(){
    const [res] = await pool.execute("SELECT * FROM products");
    return res as Product[];
}

export async function getById(id: number){
    const [res] = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    const products = res as User[];
    return products.length > 0 ? products[0] : null;
}

export async function update(product: Product){
    const {id, name, price} = product;
    await pool.execute("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, id]);
}

export async function create(product: Omit<Product, "id">){
    const {name, price} = product;
    await pool.execute("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
}

export async function deleteProduct(id: number) {
    await pool.execute("DELETE products WHERE id = ?", [id]);
}