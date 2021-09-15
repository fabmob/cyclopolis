import Link from 'next/link'
import Context from '../../components/Context'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import cyclopolisData from '../../cyclopolisData.csv'
import { rawToNumber, dataMeta } from '../villes/[name].js'
import { TabButton } from '../index'

export default function Indicateur({ key, data }) {
  console.log(data, key)
  const max = Math.max(...data.values.map(([, v]) => rawToNumber(v)))
  return (
    <Layout>
      <br />
      <ul
        css={`
          flex-wrap: nowrap;
          overflow-x: auto;
          white-space: nowrap;
          justify-content: normal;
          height: 3rem;
          scrollbar-width: none;
          display: flex;
          list-style-type: none;
          -moz-box-pack: center;
          justify-content: center;
          padding-left: 1.6rem;
          li {
            padding: 0.1rem 0rem;
            margin: 0.15rem 0.2rem;
            border-radius: 0.2rem;
            line-height: 1.6rem;
            height: 1.8rem;
          }
        `}
      >
        {Object.entries(dataMeta).map(([key, { label }]) => (
          <li key={label}>
            <TabButton>
              <Link href={'/indicateurs/' + key}>{label}</Link>
            </TabButton>
          </li>
        ))}
      </ul>
      <h1>{data.label}</h1>
      <p css="font-style: italic">En {data.unit}</p>
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

              <Link href={'/villes/' + ville}>
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
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllIndicateurs()
  console.log('PATH', paths)
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const indicateur = Object.entries(dataMeta).find(
    ([key, data]) => key === params.name
  )

  const values = cyclopolisData.map((city) => [
    city.region,
    city[indicateur[0]],
  ])
  return {
    props: {
      data: { values, key: params.name, ...indicateur[1] },
    },
  }
}

export function getAllIndicateurs() {
  return Object.keys(dataMeta).map((name) => {
    return {
      params: {
        name,
      },
    }
  })
}
