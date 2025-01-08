import pool from '../database/db';

export interface User {
    id: number,
    email: string,
    password: string,
    role: "guest" | "user" | "admin"
}

export async function getUserById(id: number): Promise<User | null>{
    const [res] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    const users = res as User[];
    return users.length > 0 ? users[0] : null;
}

export async function getUserByEmail(email: string): Promise<User | null>{
    const [res] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const users = res as User[];
    return users.length > 0 ? users[0] : null;
}

export async function createUser(user: Omit<User, 'id'>): Promise<void>{
    const { email, password, role } = user;
    await pool.execute('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, role]);
}

export async function updateUserPassword(email: string, password: string): Promise<void>{
    await pool.execute("UPDATE users SET password = ? WHERE email = ?", [password, email])
}

export async function deleteUser(email: string): Promise<void>{
    await pool.execute("DELETE FROM users WHERE email = ?", [email]);
}