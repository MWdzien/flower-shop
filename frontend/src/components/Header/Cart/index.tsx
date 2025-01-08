import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import CartItem from "@/components/Header/Cart/CartItem";
import {CartProduct} from "../../../../../common/models/CartProduct";

const tmpCartItems: CartProduct[] = [
    {id: 1, name: "kwiaty 1", price: 100.00, quantity: 2, imageSource: "bouquet1.jpg"},
    {id: 2, name: "kwiaty 2", price: 88.50, quantity: 1, imageSource: "bouquet1.jpg"},
    {id: 3, name: "kwiaty 3", price: 31.00, quantity: 1, imageSource: "bouquet1.jpg"},
    {id: 4, name: "kwiaty 4", price: 56.12, quantity: 4, imageSource: "bouquet1.jpg"}
]

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<(CartProduct)[]>([]);

    useEffect(() => {
        setCartItems(tmpCartItems);
    }, []);


    const fetchCartItems = async () => {
        const response = await fetch("http://localhost:3001/cartItems");
        const data = await response.json();
        setCartItems(data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                {cartItems.map((item, index) => {
                    return <div><CartItem name={item.name} price={item.price} initialQuantity={item.quantity} imageSource={item.imageSource}/></div>
                })}
            </div>
        </div>
    )
}

export default Cart;