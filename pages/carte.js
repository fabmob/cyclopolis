import Head from "next/head";
import Layout, { siteDescription } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Search from "../components/Search";
import data from "../cyclopolisData.csv";
import geoData from "../geoData";
import { useState } from "react";
import correspondanceGeo from "../correspondanceGéographique.csv";
import { Menu } from "./index.js";
import Link from "next/link";

console.log(correspondanceGeo);

export default function Home({ data }) {
  const [geo, setGeo] = useState(null);
  const citiesFound = !geo
    ? []
    : correspondanceGeo.filter(
        ({ ville, région, département }) => +département === +geo.departement
      );
  return (
    <Layout home>
      <Head>
        <title>{siteDescription}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p css="text-align: center">{siteDescription}</p>
      </section>
      <Menu />
      {/* Add this <section> tag below the existing <section> tag */}
      {geo && (
        <>
          <p>
            Sélectionné : {geo.region} {geo.departement}
          </p>
          {citiesFound.length > 0 && (
            <p>
              Ville correspondante :{" "}
              {citiesFound.map((c) => (
                <Link href={`/villes/${c.ville}`}>{c.ville}</Link>
              ))}
            </p>
          )}
        </>
      )}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Carte setGeo={setGeo} />
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

const Carte = ({ outreMer = false, setGeo }) => (
  <div
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

      path.exists {
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
        <g
          className={"region region-" + region.codeInsee}
          data-nom={region.nom}
          data-code_insee={region.codeInsee}
        >
          {region.departements.map((departement) => (
            <path
              data-nom={departement.nom}
              data-numerodepartement={departement.numeroDepartement}
              className={`region-${region.codeInsee} departement departement-${
                departement.codeInsee
              } departement-${departement.nom} ${
                correspondanceGeo.find(
                  ({ ville, région, département }) =>
                    +departement.numeroDepartement === +département
                )
                  ? "exists"
                  : ""
              }`}
              d={departement.d}
              onClick={() =>
                setGeo({
                  region: region.codeInsee,
                  departement: departement.numeroDepartement,
                })
              }
            ></path>
          ))}
        </g>
      ))}
    </svg>
  </div>
);
