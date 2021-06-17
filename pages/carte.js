import Head from "next/head";
import Layout, { siteDescription } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Search from "../components/Search";
import data from "../cyclopolisData.csv";
import geoData from "../geoData";

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
        <Carte />
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

const Carte = ({ outreMer = false }) => (
  <div
    className="carte"
    css={`
      path {
        stroke: #000000;
        stroke-width: 1px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-opacity: 0.25;
        fill: #86aae0;
      }
      g:hover path {
        fill: #86cce0;
      }
      g path:hover {
        fill: #86eee0;
      }
    `}
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={`${outreMer ? "0" : "80"} 0 667 578`}
      xmlSpace="preserve"
    >
      {geoData.map((region) => (
        <g>
          <a target="_blank" xlinkHref="region01.html">
            <g
              className={"region region-" + region.codeInsee}
              data-nom={region.nom}
              data-code_insee={region.codeInsee}
            >
              {region.departements.map((departement) => (
                <path
                  data-nom={departement.nom}
                  data-numerodepartement={departement.numeroDepartement}
                  className={`region-${region.codeInsee} departement departement-${departement.codeInsee} departement-${departement.nom}`}
                  d={departement.d}
                  onClick={() =>
                    setGeo(region.codeInsee, departement.numeroDepartement)
                  }
                ></path>
              ))}
            </g>
          </a>
        </g>
      ))}
    </svg>
  </div>
);
