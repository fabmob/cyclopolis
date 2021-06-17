import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import cyclopolisData from "../../cyclopolisData.csv";
import Segments from "../../components/Segments";
import getCityData from "../../components/wikidata";
import styled from "styled-components";

const formatInputNumber = (string) => (+string.replace(",", ".")).toFixed(1);

const dataMeta = {
  meandistance_km: {
    label: "Distance moyenne par jour",
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
      <h1>{data.region}</h1>
      <div>{wikidata?.pic && <CityImage src={wikidata.pic.value} />}</div>
      <br />
      {Object.entries(dataMeta).map(([key, { label, icon, unit }]) => (
        <div
          css={`
            display: flex;
            justify-content: start;
            align-items: center;
          `}
        >
          <div css="font-size: 200%; margin: 0 .6rem">{icon}</div>
          <div>
            <h2>{label} </h2>

            <div>
              <span css="font-size: 200%">{formatInputNumber(data[key])}</span>
              &nbsp;
              {unit}
            </div>
          </div>
        </div>
      ))}

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
  max-width: 8rem;
`;
