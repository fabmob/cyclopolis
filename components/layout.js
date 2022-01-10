import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import Link from 'next/link'
import { LittleAbout } from '../pages/a-propos'

const name = 'Comment ça roule ?'
export const siteDescription =
  'Découvrez les chiffres de la circulation vélo dans les collectivités du Club des villes et territoires cyclables.'

export default function Layout({ children, home, noAbout }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteDescription
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header id="header">
        <Link href="/" passHref>
          <div>
            <Image
              width={18*4}
              height={18*4}
              src="/images/commentçaroule-2.svg"
              alt={name}
            />
            <h1>{name}</h1>
          </div>
        </Link>
      </header>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Retour à l’accueil</a>
          </Link>
        </div>
      )}
      <main>{children}</main>
      {!noAbout && (
        <footer>
          <LittleAbout />
        </footer>
      )}
    </div>
  )
}
