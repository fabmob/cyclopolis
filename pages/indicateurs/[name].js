import Link from 'next/link'
import Context from '../../components/Context'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import cyclopolisData, { simplifyNames } from '../../cyclopolisData'
import { rawToNumber, dataMeta, formatInputNumber } from '../villes/[name].js'
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
          @media (min-width: 800px) {
            flex-wrap: wrap;
            height: auto;
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
      <h1>
        {data.label}
        <small css="font-size: 60%; margin-left: .6rem; font-weight: normal">
          En {data.unit}
        </small>
      </h1>
      <p>{data.description}</p>
      <ul>
        {data.values
          .sort(([, a], [, b]) => rawToNumber(b) - rawToNumber(a))
          .map(([ville, valeur]) => {
            const width = (rawToNumber(valeur) / max) * 80
            return (
              <li
                css={`
                  margin-bottom: 0.6rem;
                `}
              >
                <Link href={'/villes/' + ville}>
                  <a>
                    <span
                      css={`
                        margin-left: 0.3rem;
                        line-height: 1.2rem;
                        color: black;
                        display: inline-block;
                      `}
                    >
                      {simplifyNames(ville)}
                    </span>
                  </a>
                </Link>
                <div
                  css={`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <span
                    css={`
                      width: ${width}%;
                      display: inline-block;
                      height: 1.5rem;
                      background: #32337b;
                      margin-right: 0.4rem;
                    `}
                  ></span>
                  <span>{formatInputNumber(valeur)}</span>
                </div>
              </li>
            )
          })}
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

  const values = cyclopolisData.map((city) => [city.area, city[indicateur[0]]])
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
