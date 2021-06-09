import Head from "next/head";
import Layout, { siteDescription } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Search from "../components/Search";
import data from "../cyclopolisData.csv";

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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Les territoires</h2>
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
