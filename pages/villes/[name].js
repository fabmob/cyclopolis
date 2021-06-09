import Layout from "../../components/layout";
import cyclopolisData from "../../cyclopolisData.csv";
import Segments from "./Segments";

const formatInputNumber = (string) => (+string.replace(",", ".")).toFixed(1);

export default function Ville({ data }) {
  return (
    <Layout>
      {data.region}
      <br />
      <div>📏 {formatInputNumber(data.meandistance_km)} km</div>
      <Segments data={data} />
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
