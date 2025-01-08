import React, {useState} from "react";
import styles from "./styles.module.scss"
import Image from "next/image"


const CartItem = (item: {name: string, price: number, initialQuantity: number, imageSource: string})=>  {
    const {name, price, initialQuantity, imageSource} = item;

    const [quantity, setQuantity] = useState(initialQuantity);

    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src={`/images/${imageSource}`}
                    alt="product"
                    fill
                />
            </div>
            <div className={styles.text}>
                <h3>{name}</h3>
                <p>{price*quantity}zł</p>
                <span>
                    <button onClick={() => quantity <= 0 ? setQuantity(0) : setQuantity(quantity - 1)}>-</button>
                    <p>{quantity}</p>
                    <button onClick={() => quantity >= 99 ? setQuantity(99) : setQuantity(quantity + 1)}>+</button>
                </span>
            </div>
        </div>
    )
}

export default CartItem;