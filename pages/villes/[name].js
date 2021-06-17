import Layout from "../../components/layout";
import cyclopolisData from "../../cyclopolisData.csv";
import Segments from "../../components/Segments";

const formatInputNumber = (string) => (+string.replace(",", ".")).toFixed(1);

export default function Ville({ data }) {
  return (
    <Layout>
      <h1>{data.region}</h1>
      <br />
      <div>📏 {formatInputNumber(data.meandistance_km)} km</div>

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
