import Layout from "../../components/layout";
import cyclopolisData from "../../cyclopolisData.csv";
import Segments from "../../components/Segments";

const formatInputNumber = (string) => (+string.replace(",", ".")).toFixed(1);

const dataMeta = {
  meandistance_km: {
    label: "Distance moyenne par jour",
    icon: "📏",
    unit: "km",
  },
  mean_speed_mean: { label: "Vitesse moyenne", icon: "🐰", unit: "km/h" },
};

export default function Ville({ data }) {
  return (
    <Layout>
      <h1>{data.region}</h1>
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
