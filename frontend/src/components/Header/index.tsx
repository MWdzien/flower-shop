'use client'
import styles from "./styles.module.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";


const Header: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const cartRef = useRef(null);

    useEffect(()=> {
        if (isActive) setIsActive(false);
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.to(cartRef, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {gsap.to(cartRef.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
                onEnterBack: () => {gsap.to(cartRef.current, {scale: 0, duration: 0.25, ease: "power1.out"})}
            }
        })



    }, []);

    return (

        <div className={styles.header}>
            <div className={styles.nav}>
                <div>
                    
                </div>
                <div ref={cartRef} className={styles.button}>
                    <a>cart</a>
                </div>
            </div>
        </div>
    )
}

export default Header;