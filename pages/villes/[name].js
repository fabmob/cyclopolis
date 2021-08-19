import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Segments from "../../components/Segments";
import getCityData from "../../components/wikidata";
import cyclopolisData from "../../cyclopolisData.csv";
import Context from "../../components/Context";
import Header from "../../components/Header";
import Link from "next/link";

const frenchNumber = (number) =>
  number.toLocaleString("fr-FR", {
    maximumSignificantDigits: 2,
  });

export const rawToNumber = (string) => +string.replace(",", ".");
const formatInputNumber = (string, unit) => {
  const number = rawToNumber(string);

  if (unit === "minutes" && number <= 1) {
    return [frenchNumber(number * 60), "secondes"];
  }
  return [frenchNumber(number), unit];
};

export const dataMeta = {
  meandistance_km: {
    label: "Distance / jour",
    icon: "📏",
    unit: "km",
  },
  mean_speed_mean: { label: "Vitesse moyenne", icon: "🏇", unit: "km/h" },
  stop_time_mean_minutes: {
    label: "Temps d'arrêt / km",
    icon: "✋️",
    unit: "minutes",
  },
  travel_time_mean_minutes: {
    label: "Durée d'un trajet",
    icon: "⌚️",
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
      <Header name={data.region} wikidata={wikidata} />
      <br />
      <ul
        css={`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        `}
      >
        {Object.entries(dataMeta).map(
          ([key, { label, icon, unit: unitRaw }]) => {
            const [number, unit] = formatInputNumber(data[key], unitRaw);

            return (
              <Link href={"/indicateurs/" + key}>
                <a title="Comparer avec d'autres villes">
                  <li
                    css={`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-wrap: wrap;
                      position: relative;
                      padding-bottom: 1rem;
                      h2 {
                        text-transform: uppercase;
                        font-weight: 300;
                        margin: 0.4rem;
                        font-size: 100%;
                      }
                      max-width: 14rem;
                      @media (max-width: 800px) {
                        max-width: 8rem;
                        h2 {
                          font-size: 90%;
                          text-align: center;
                        }
                        .emoji {
                          font-size: 150%;
                        }
                      }
                      box-shadow: 0 1px 3px rgb(41 117 209 / 12%),
                        0 1px 2px rgb(41 117 209 / 24%);
                      margin: 0.6rem;
                    `}
                  >
                    <div
                      className="emoji"
                      css="font-size: 200%; margin: 0 .6rem"
                    >
                      {icon}
                    </div>
                    <h2>{label} </h2>

                    <div>
                      <span css="font-size: 200%">{number}</span>
                      &nbsp;
                      {unit}
                    </div>
                    <Context {...{ value: data[key], metric: key }} />
                  </li>
                </a>
              </Link>
            );
          }
        )}
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
