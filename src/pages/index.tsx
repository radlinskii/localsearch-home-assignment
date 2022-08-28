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
                <span>
                    Try out{' '}
                    <Link href="/places/GXvPAor1ifNfpF0U5PTG0w">
                        <a>Casa Ferlin</a>
                    </Link>
                </span>
                <span>
                    ... or{' '}
                    <Link href="/places/ohGSnJtMIC5nPfYRi_HTAg">
                        <a>Le Café du Marché</a>
                    </Link>
                </span>
            </main>
        </div>
    )
}

export default Home
