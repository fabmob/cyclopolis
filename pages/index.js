import Head from "next/head";
import Layout, { siteDescription } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Search from "../components/Search";
import data from "../cyclopolisData.csv";
import Link from "next/link";
import styled from "styled-components";

export const TabButton = styled.button`
  background: rgb(0, 112, 243);
  box-shadow: rgb(0 118 255 / 39%) 0px 4px 14px 0px;
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 0.4rem;
  border: none;
  font-size: 100%;
  margin: 0.4rem;
  a {
    color: inherit;
  }
  cursor: pointer;
`;

export default function Home({ data }) {
  console.log("DATA°", data);
  return (
    <Layout home>
      <Head>
        <title>{siteDescription}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p css="text-align: center">{siteDescription}</p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <Menu />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Search data={data} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data,
    },
  };
}

export const Menu = () => (
  <div
    css={`
      display: flex;
      justify-content: center;
      margin: 1rem 0;
    `}
  >
    <TabButton>
      <Link href="/">Vue liste</Link>
    </TabButton>
    <TabButton>
      <Link href="/carte">Vue carte</Link>
    </TabButton>
  </div>
);
