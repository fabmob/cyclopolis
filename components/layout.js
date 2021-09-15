import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import styled from 'styled-components'
import Logo from '../public/images/commentçaroule.svg'
import { About } from '../pages/a-propos'

const Title = styled.h1`
  font-size: ${({ size }) => size || '250%'};
  color: #ae0917;
  margin: 0.2rem;
  white-space: nowrap;
`

const name = 'Comment ça roule ?'
export const siteDescription =
  'Découvrez les chiffres du vélo dans les métropoles françaises.'

export default function Layout({ children, home }) {
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
      <header className={styles.header}>
        <Link href="/">
          <div
            css={`
              display: flex;
              align-items: center;
              cursor: pointer;
            `}
          >
            <img
              css="width:4rem"
              src="/images/commentçaroule-2.svg"
              alt={name}
            />
            <Title size={'160%'}>{name}</Title>
          </div>
        </Link>
      </header>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Retour à l'accueil</a>
          </Link>
        </div>
      )}
      <main>{children}</main>
      <footer>
        <div
          css={`
            display: flex;
            justify-content: center;
            margin-top: 6rem;
            background: linear-gradient(90deg, #0c7ee8 0%, #5fe49b 100%);
            font-weight: 500;
            line-height: 2rem;
            a {
              color: white;
            }
          `}
        >
          <a>À propos</a>
        </div>
        <About />
      </footer>
    </div>
  )
}
