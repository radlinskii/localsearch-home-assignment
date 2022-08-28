import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Localsearch home assignment</title>
                <meta name="description" content="next.js app for localsearch home assignment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Hello!</h1>
                <Link href="/places/GXvPAor1ifNfpF0U5PTG0w">
                    <a>Try out Casa Ferlin</a>
                </Link>
                <Link href="/places/ohGSnJtMIC5nPfYRi_HTAg">
                    <a>... or Le Café du Marché</a>
                </Link>
            </main>
        </div>
    )
}

export default Home
