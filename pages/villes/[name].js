import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import getCityData from '../../components/wikidata'
import correspondanceMétropoleVille from '../../correspondanceMétropoleVille'
import cyclopolisData from '../../cyclopolisData'
import ProgressBar from '../../components/ProgressBar'

export function frenchNumber(number) {
  return number.toLocaleString('fr-FR', {
    maximumSignificantDigits: 2,
  })
}

export const rawToNumber = (string) =>
  typeof string === 'string' ? +string.replace(',', '.') : string
export function formatInputNumber(string, unit) {
  if (string == undefined) return 'N/A'
  const number = rawToNumber(string)

  if (unit === 'minutes' && number <= 1) {
    return [frenchNumber(number * 60), 'secondes']
  }

  if (unit === 'kgCO₂' && number > 1000) {
    return [frenchNumber(number / 1000), ' tonnes de CO₂']
  }
  return [frenchNumber(number), unit]
}

export const dataMeta = {
  distance: {
    label: 'Distance par trajet',
    icon: '📏',
    unit: 'km',
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés avec Geovelo par les utilisateurs de l'application.",
    color: '#6F1E51',
  },
  distance_semaine: {
    label: 'Distance en semaine',
    icon: '📏',
    unit: 'km',
    sub: true,
    color: '#6F1E51',
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés en semaine avec Geovelo par les utilisateurs de l'application. ",
  },
  distance_weekend: {
    label: 'Distance en weekend',
    icon: '📏',
    unit: 'km',
    sub: true,
    color: '#6F1E51',
    description:
      "Cet indicateur reflète la distance moyenne des trajets qui sont enregistrés le week-end avec Geovelo par les utilisateurs de l'application. ",
  },
  vitesse: {
    label: 'Vitesse moyenne',
    icon: '🏇',
    unit: 'km/h',
    color: '#5758BB',
    description:
      "Cette mesure correspond à la moyenne de l'ensemble des trajets enregistrés par les utilisateurs Geovelo sur le territoire concerné. ",
  },
  arrêt: {
    label: "Temps d'arrêt / km",
    icon: '✋',
    unit: 'secondes',
    color: '#1B1464',
    description:
      "Cette valeur indique la durée durant laquelle les cyclistes sont arrêtés pour chaque kilomètre qu'ils parcourent à vélo sur le territoire concerné.",
  },
  durée: {
    label: "Durée d'un trajet",
    icon: '⏱️',
    unit: 'minutes',
    color: '#1289A7',
    description:
      "Cette durée correspond à la durée moyenne des trajets qui sont enregistrés avec l'application Geovelo sur le territoire concerné. ",
  },
  co2: {
    label: 'économisé par les cyclistes Géovélo',
    icon: '🌍️',
    unit: 'kgCO₂',
    color: '#006266',
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

  const background = {
    A: '#2ecc71',
    B: '#f1c40f',
    C: '#d35400',
    D: '#c0392b',
    E: '#2c3e50',
  }[data['Taux de confiance']]

  const values = (indicator) =>
    cyclopolisData.map((val) => rawToNumber(val[indicator]))
  const maxs = {}
  Object.keys(dataMeta).forEach(
    (indicator) => (maxs[indicator] = Math.max(...values(indicator)))
  )

  const evol = (indicator, data) => {
    const current = rawToNumber(data[indicator])
    const prev = rawToNumber(data[indicator + '_prec'])
    if (prev == NaN) {
      return 'pas de données antérieures'
    }
    const val = ((current - prev) * 100) / prev
    if (val > 0) {
      return '+' + frenchNumber(val) + ' %'
    }
    return frenchNumber(val) + ' %'
  }

  return (
    <Layout>
      <Head>
        <title>{data.area}</title>
      </Head>
      <Header name={data.area} data={data} wikidata={wikidata} />
      <div id="city-indicators">
        <div>
          <h2 style={{ color: '#81b5dc' }}>{dataMeta.distance.label}</h2>
          <span>en {dataMeta.distance.unit}</span>
        </div>
        <ProgressBar
          value={data.distance}
          max={maxs.distance}
          color="#81b5dc"
        />
        <span>Évolution : {evol('distance', data)}</span>
        <ProgressBar
          value={data.distance_semaine}
          max={maxs.distance_semaine}
          color="#81b5dc"
          label="semaine"
        />
        <ProgressBar
          value={data.distance_weekend}
          max={maxs.distance_weekend}
          color="#81b5dc"
          label="week-end"
        />

        <div>
          <h2 style={{ color: '#cb5454' }}>{dataMeta.vitesse.label}</h2>
          <span>en {dataMeta.vitesse.unit}</span>
        </div>
        <ProgressBar value={data.vitesse} max={maxs.vitesse} color="#cb5454" />
        <span>Évolution : {evol('vitesse', data)}</span>

        <div>
          <h2 style={{ color: '#cb5454' }}>{dataMeta.arrêt.label}</h2>
          <span>en {dataMeta.arrêt.unit}</span>
        </div>
        <ProgressBar value={data.arrêt} max={maxs.arrêt} color="#cb5454" />
        <span>Évolution : {evol('arrêt', data)}</span>

        <div className="co2-saved">
          {formatInputNumber(data.co2, dataMeta.co2.unit)} {dataMeta.co2.label}
        </div>
      </div>

      <h2>Taux de confiance des données</h2>
      <div style={{ background }} className="confiance">
        {data['Taux de confiance']}
      </div>
      <small>
      Cet indice de confiance va de A (niveau de confiance élevé), à E (indice
      de confiance faible). Il sera ré-évalué à chaque mise à jour en fonction
      de l’évolution de l’usage constaté sur chaque territoire.
      </small>

      <h2>Les voies fréquentées par les cyclistes</h2>
      <Segments
        data={data}
        city={correspondanceMétropoleVille[data.area] || data.area}
      />
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
