import styles from "./styles.module.scss"
import Image from "next/image"

const LandingPage: React.FC = () => {


    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.text}>
                    <h1>Flower shop</h1>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src="/images/main.jpg"
                        alt="main"
                        fill
                    />

                </div>
            </div>
        </div>
    )
}

export default LandingPage;