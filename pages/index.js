import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import data from "../cyclopolisData.csv";

import Link from "next/link";

export default function Home({ data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>L'observatoire des territoires cyclables</p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Les territoires</h2>
        <ul className={utilStyles.list}>
          {data.map(({ region }) => (
            <Link href={"/villes/" + region}>
              <a>
                <li className={utilStyles.listItem} key={region}>
                  {region}
                </li>
              </a>
            </Link>
          ))}
        </ul>
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
