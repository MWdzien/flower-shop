import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {motion} from "framer-motion"
import {slideUp, opacity} from "./anim"


const Preloader: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        //if (index == words.length -1) return;
        setTimeout(() => {
            setIndex(index+1)
        }, index == 0 ? 1000 : 150);
    }, [index]);

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
        </motion.div>
    )
}

export default Preloader;