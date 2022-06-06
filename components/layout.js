import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { LittleAbout } from '../pages/a-propos'

const name = 'Comment ça roule ?'
export const siteDescription =
  'Découvrez les chiffres de la circulation vélo dans les collectivités du Club des villes et territoires cyclables et marchables.'

export default function Layout({ children, page, noAbout }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Indicateurs de circulation vélo" />
        <meta name="og:title" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header id="header">
        <Link href="/" passHref>
          <div>
            <Image
              width={18 * 4}
              height={18 * 4}
              src="/images/commentcaroule-2.svg"
              alt={name}
            />
            <h1>{name}</h1>
          </div>
        </Link>
      </header>
      <Menu page={page} />
      <main>{children}</main>
      {!noAbout && (
        <footer>
          <LittleAbout />
        </footer>
      )}
    </div>
  )
}
