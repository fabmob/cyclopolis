import Layout from "../../components/layout";
import cities from "../../cities.json";

export default function Ville({ data }) {
  return (
    <Layout>
      {data.name}
      <br />
      {data.score}
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
  const data = cities.find((city) => city.name === params.name);
  return {
    props: {
      data,
    },
  };
}

export function getAllCityNames() {
  return cities.map(({ name }) => {
    return {
      params: {
        name,
      },
    };
  });
}
