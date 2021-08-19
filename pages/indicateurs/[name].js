import Link from "next/link";
import Context from "../../components/Context";
import Layout from "../../components/layout";
import Segments from "../../components/Segments";
import cyclopolisData from "../../cyclopolisData.csv";
import { rawToNumber, dataMeta } from "../villes/[name].js";

export default function Indicateur({ key, data }) {
  console.log(data, key);
  const max = Math.max(...data.values.map(([, v]) => rawToNumber(v)));
  return (
    <Layout>
      <br />
      <h1>{data.label}</h1>
      <ul>
        {data.values
          .sort(([, a], [, b]) => rawToNumber(b) - rawToNumber(a))
          .map(([ville, valeur]) => (
            <li
              css={`
                position: relative;
                margin-bottom: 0.2rem;
              `}
            >
              <span
                css={`
                  position: absolute;
                  left: 0;
                  height: 1.5rem;
                  background: #0c7ee8;
                  display: inline-block;
                  z-index: -1;
                  width: ${(rawToNumber(valeur) / max) * 80}%;
                `}
              ></span>

              <Link href={"/villes/" + ville}>
                <a>
                  <span
                    css={`
                      margin-left: 0.3rem;
                      color: white;
                    `}
                  >
                    {ville}
                  </span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllIndicateurs();
  console.log("PATH", paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const indicateur = Object.entries(dataMeta).find(
    ([key, data]) => key === params.name
  );

  const values = cyclopolisData.map((city) => [
    city.region,
    city[indicateur[0]],
  ]);
  return {
    props: {
      data: { values, key: params.name, label: indicateur[1].label },
    },
  };
}

export function getAllIndicateurs() {
  return Object.keys(dataMeta).map((name) => {
    return {
      params: {
        name,
      },
    };
  });
}
