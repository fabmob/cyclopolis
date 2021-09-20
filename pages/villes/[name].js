import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import getCityData from '../../components/wikidata'
import cyclopolisData from '../../cyclopolisData'
import Context from '../../components/Context'
import Header from '../../components/Header'
import Link from 'next/link'
import Emoji from '../../components/Emoji'
import Indicator from '../../components/Indicator'
import correspondanceMétropoleVille from '../../correspondanceMétropoleVille'

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

  if (unit === 'kgCO2' && number > 1000) {
    return [Math.round(number / 1000), 'tonnes CO2']
  }
  return [frenchNumber(number), unit]
}

export const dataMeta = {
  'Distance moyenne': {
    label: 'Distance par trajet',
    icon: '📏',
    unit: 'km',
  },
  'Distance moyenne en semaine': {
    label: 'Distance / trajet en semaine',
    icon: '📏',
    unit: 'km',
    sub: true,
  },
  'Distance moyenne en week-end': {
    label: 'Distance / trajet en weekend',
    icon: '📏',
    unit: 'km',
    sub: true,
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
        {Object.entries(dataMeta)
          .filter(([, { sub }]) => !sub)
          .map((meta) => (
            <Indicator meta={meta} data={data} />
          ))}
      </ul>

      {false && (
        <>
          <h2>Les segments les plus fréquentés</h2>
          <Segments
            data={data}
            city={correspondanceMétropoleVille[data.area] || data.area}
          />
        </>
      )}
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
