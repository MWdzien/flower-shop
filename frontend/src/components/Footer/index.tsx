import styles from "./styles.module.scss"
import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion"

const Footer: React.FC = () => {
    const containerRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);


    return (
        <motion.div style={{y}} className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <h2>Contact us</h2>
                </div>
                <div className={styles.info}>
                    <p>info@flowershop.com</p>
                    <p>+48 491 501 277</p>

                </div>
                <div className={styles.additional}>
                    <div>
                        <span>
                            <h3>version</h3>
                            <p>2024 flowershop®</p>
                        </span>
                    </div>
                    <div>
                        <span>
                        <h3>socials</h3>
                        <p>instagram</p>
                    </span>
                        <p>facebook</p>
                        <p>pinterest</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer;
