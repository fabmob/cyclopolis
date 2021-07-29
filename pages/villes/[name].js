import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import cyclopolisData from "../../cyclopolisData.csv";
import Segments from "../../components/Segments";
import getCityData from "../../components/wikidata";
import styled from "styled-components";

const formatInputNumber = (string) => (+string.replace(",", ".")).toFixed(1);

const dataMeta = {
  meandistance_km: {
    label: "Distance moyenne / jour",
    icon: "📏",
    unit: "km",
  },
  mean_speed_mean: { label: "Vitesse moyenne", icon: "🐰", unit: "km/h" },
  stop_time_mean_minutes: {
    label: "Temps d'arrêt moyen",
    icon: "✋️",
    unit: "minutes",
  },
};

export default function Ville({ data }) {
  const [wikidata, setWikidata] = useState(null);
  console.log(wikidata);

  useEffect(() => {
    getCityData(data.region).then((json) =>
      setWikidata(json?.results?.bindings[0])
    );
  }, [data.region]);

  return (
    <Layout>
      <header
        css={`
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-evenly;
        `}
      >
        <h1>{data.region}</h1>
        {wikidata?.pic && <CityImage src={wikidata.pic.value} />}
        {wikidata?.population && (
          <p>{(+wikidata.population.value).toLocaleString()} hab.</p>
        )}
      </header>
      <br />
      <ul
        css={`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        `}
      >
        {Object.entries(dataMeta).map(([key, { label, icon, unit }]) => (
          <li
            css={`
              display: flex;
              justify-content: start;
              align-items: center;
              h2 {
                text-transform: uppercase;
                font-weight: 300;
                margin: 0.4rem;
                font-size: 100%;
              }
              max-width: 14rem;
              box-shadow: 0 1px 3px rgb(41 117 209 / 12%),
                0 1px 2px rgb(41 117 209 / 24%);
              margin: 0.6rem;
            `}
          >
            <div css="font-size: 280%; margin: 0 .6rem">{icon}</div>
            <div>
              <h2>{label} </h2>

              <div>
                <span css="font-size: 200%">
                  {formatInputNumber(data[key])}
                </span>
                &nbsp;
                {unit}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2>Les segments les plus fréquentés</h2>
      <Segments data={data} city={data.region} />
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllCityNames();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log("etstatic", params);
  const data = cyclopolisData.find((city) => city.region === params.name);
  return {
    props: {
      data,
    },
  };
}

export function getAllCityNames() {
  return cyclopolisData.map(({ region }) => {
    return {
      params: {
        name: region,
      },
    };
  });
}

const CityImage = styled.img`
  max-height: 6rem;
`;
