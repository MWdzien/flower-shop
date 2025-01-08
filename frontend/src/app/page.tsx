'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Preloader from "../components/Preloader"
import Header from "../components/Header"
import Footer from "../components/Footer"
import React, {useEffect, useState} from "react";
import Lenis from "lenis"
import {AnimatePresence} from "framer-motion";
import LandingPage from "@/components/LandingPage";
import Cart from "@/components/Header/Cart";


export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf);

        (async () => {
            /*const LocomotiveScroll = (await import('locomotive-scroll')).default;
            const locomotiveScroll = new LocomotiveScroll();*/

            setTimeout(() => {
                setIsLoading(false);
                document.body.style.cursor = 'default';
                window.scrollTo(0, 0);
            }, 2000)
        })()
    }, [])
  return (
      <main className={styles.main}>
          <AnimatePresence mode="wait">
              {isLoading && <Preloader />}
          </AnimatePresence>
          <Header />
          <LandingPage />
          <Footer />
          <Cart />
      </main>
  )
}
