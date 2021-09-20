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
  'Distance moyenne [km]': {
    label: 'Distance par trajet',
    icon: '📏',
    unit: 'km',
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés avec Geovelo par les utilisateurs de l'application.",
  },
  'Distance moyenne en semaine [km]': {
    label: 'Distance / trajet en semaine',
    icon: '📏',
    unit: 'km',
    sub: true,
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés en semaine avec Geovelo par les utilisateurs de l'application. ",
  },
  'Distance moyenne en week-end [km]': {
    label: 'Distance / trajet en weekend',
    icon: '📏',
    unit: 'km',
    sub: true,
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés le week-end avec Geovelo par les utilisateurs de l'application. ",
  },
  'Vitesse moyenne [km/h]': {
    label: 'Vitesse moyenne',
    icon: '🏇',
    unit: 'km/h',
    description:
      "Cette mesure correspond à la moyenne de l'ensemble des trajets enregistrés par les utilisateurs Geovelo sur le territoire concerné. ",
  },
  "Durée d'arrêt moyenne par km [s]": {
    label: "Temps d'arrêt / km",
    icon: '✋',
    unit: 'secondes',
    description:
      "Cette valeur indique la durée durant laquelle les cyclistes sont arrêtés pour chaque kilomètre qu'ils parcourent à vélo sur le territoire concerné.",
  },
  'Durée moyen du trajet [min]': {
    label: "Durée d'un trajet",
    icon: '⏱️',
    unit: 'minutes',
    description:
      "Cette durée correspond à la durée moyenne des trajets qui sont enregistrés avec l'application Geovelo sur le territoire concerné. ",
  },
  'Emissions de CO2 économisés [kg]': {
    label: 'CO2 économisé',
    icon: '🌍️',
    unit: 'kgCO2',
    description:
      "Cet indicateur mesure la quantité de CO2 qui aurait été émise si tous les trajets enregistrés avec l'application Geovelo avaient été réalisés en voiture individuelle plutôt qu'en vélo. ",
  },
}

export default function Ville({ data }) {
  const [wikidata, setWikidata] = useState(null)

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
