import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </nav>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
