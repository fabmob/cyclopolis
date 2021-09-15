import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import getCityData from '../../components/wikidata'
import cyclopolisData from '../../cyclopolisData'
import Context from '../../components/Context'
import Header from '../../components/Header'
import Link from 'next/link'
import Emoji from '../../components/Emoji'

const frenchNumber = (number) =>
  number.toLocaleString('fr-FR', {
    maximumSignificantDigits: 2,
  })

export const rawToNumber = (string) =>
  typeof string === 'string' ? +string.replace(',', '.') : string
export const formatInputNumber = (string, unit) => {
  if (string == undefined) return 'N/A'
  const number = rawToNumber(string)

  if (unit === 'minutes' && number <= 1) {
    return [frenchNumber(number * 60), 'secondes']
  }
  return [frenchNumber(number), unit]
}

export const dataMeta = {
  'Distance moyenne': {
    label: 'Distance / jour',
    icon: '📏',
    unit: 'km',
  },
  'Vitesse moyenne': {
    label: 'Vitesse moyenne',
    icon: '🏇',
    unit: 'km/h',
  },
  "Durée d'arrêt moyenne par km": {
    label: "Temps d'arrêt / km",
    icon: '✋',
    unit: 'secondes',
  },
  'Durée moyen du trajet': {
    label: "Durée d'un trajet",
    icon: '⏱️',
    unit: 'minutes',
  },
  'Emissions de CO2 économisés': {
    label: 'CO2 économisé',
    icon: '🌍️',
    unit: 'kgCO2',
  },
}

export default function Ville({ data }) {
  const [wikidata, setWikidata] = useState(null)
  console.log(wikidata)

  useEffect(() => {
    getCityData(data.area).then((json) =>
      setWikidata(json?.results?.bindings[0])
    )
  }, [data.area])

  return (
    <Layout>
      <Header name={data.area} data={data} wikidata={wikidata} />
      <br />
      <ul
        css={`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
        `}
      >
        {Object.entries(dataMeta).map(
          ([key, { label, icon, unit: unitRaw }]) => {
            const [number, unit] = formatInputNumber(data[key], unitRaw)

            return (
              <Link href={'/indicateurs/' + key}>
                <li
                  title="Comparer avec d'autres villes"
                  css={`
                    cursor: pointer;
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
                    h2 {
                      max-width: 8rem;
                      text-align: right;
                    }
                    @media (max-width: 800px) {
                      max-width: 8rem;
                      h2 {
                        font-size: 90%;
                        text-align: center;
                        max-width: auto;
                        text-align: center;
                      }
                      .emoji {
                        font-size: 150%;
                      }
                    }
                    box-shadow: 0 1px 3px rgba(209, 41, 41, 0.12),
                      0 1px 2px rgba(209, 41, 41, 0.24);
                    border: 2px solid black;
                    border-radius: 0.2rem;
                    margin: 0.6rem 0;
                  `}
                >
                  <div className="emoji" css=" margin: 0 .6rem;">
                    <Emoji e={icon} sizeRem="3" />
                  </div>
                  <h2>{label} </h2>
                  {key === 'Distance moyenne' && (
                    <div
                      css={`
                        width: 100%;
                        span {
                          display: inline-block;
                          margin: 0 0.4rem;
                        }
                      `}
                    >
                      <span css="">
                        <span>L</span>
                        <span>M</span>
                        <span>M</span>
                        <span>J</span>
                        <span>V</span>
                      </span>
                      <span>S</span>
                      <span>D</span>
                    </div>
                  )}

                  <div>
                    <span css="font-size: 200%">{number}</span>
                    &nbsp;
                    {unit}
                  </div>
                  <Context {...{ value: data[key], metric: key }} />
                </li>
              </Link>
            )
          }
        )}
      </ul>

      <h2>Les segments les plus fréquentés</h2>
      <Segments data={data} city={data.area} />
      <p>
        Taux de confiance des données :{' '}
        <span
          css={`
            padding: 0.1rem 0.4rem;
            background: ${{
              A: '#2ecc71',
              B: '#f1c40f',
              C: '#d35400',
              D: '#c0392b',
              E: '#2c3e50',
            }[data['Taux de confiance ']]};
            color: white;
          `}
        >
          {data['Taux de confiance ']}
        </span>
      </p>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllCityNames()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const data = cyclopolisData.find((city) => city.area === params.name)
  return {
    props: {
      data,
    },
  }
}

export function getAllCityNames() {
  return cyclopolisData.map(({ area }) => {
    return {
      params: {
        name: area,
      },
    }
  })
}
