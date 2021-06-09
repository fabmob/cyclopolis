import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import styled from "styled-components";

const Title = styled.h1`
  font-size: ${({ size }) => size || "250%"};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.2rem;
`;

const name = "Cyclopolis";
export const siteDescription =
  "L'observatoire de l'usage du vélo dans les collectivités françaises";

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
            `}
          >
            <Image
              priority
              src="/images/logo.svg"
              className={utilStyles.borderCircle}
              height={home ? 80 : 40}
              width={home ? 80 : 40}
              alt={name}
            />
            <Title size={!home && "180%"}>{name}</Title>
          </div>
        </Link>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
