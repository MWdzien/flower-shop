
export interface User {
    id: number,
    email: string,
    password: string,
    role: "guest" | "user" | "admin"
}