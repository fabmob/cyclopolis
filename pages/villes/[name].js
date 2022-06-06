import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Layout from '../../components/layout'
import Segments from '../../components/Segments'
import getCityData from '../../components/wikidata'
import correspondanceMétropoleVille from '../../correspondanceMétropoleVille'
import cyclopolisData from '../../cyclopolisData'
import ProgressBar from '../../components/ProgressBar'
import national from '../../national.json'

export function frenchNumber(number) {
  return number.toLocaleString('fr-FR', {
    maximumSignificantDigits: 2,
  })
}

export function evolSimple(current, prev) {
  const val = ((current - prev) * 100) / prev
  if (val > 0) {
    return '+' + frenchNumber(val) + ' %'
  }
  return frenchNumber(val) + ' %'
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
    if (prev === null) {
      return 'pas de données antérieures'
    }
    const val = ((current - prev) * 100) / prev
    if (val > 0) {
      return '+' + frenchNumber(val) + ' %'
    }
    return frenchNumber(val) + ' %'
  }

  const maxDistance = Math.max(maxs.distance, maxs.distance_semaine, maxs.distance_weekend)

  return (
    <Layout>
      <Head>
        <title>{data.area}</title>
      </Head>
      <Header name={data.area} data={data} wikidata={wikidata} />
      <h2>Taux de confiance des données</h2>
      <div className="confidence">
        <div style={{ background }} className="confiance">
          {data['Taux de confiance']}
        </div>
        <small>
        Cet indice de confiance va de A (niveau de confiance élevé), à E (indice
        de confiance faible). Il sera ré-évalué à chaque mise à jour en fonction
        de l’évolution de l’usage constaté sur chaque territoire.
        </small>
      </div>
      <div id="city-indicators">
        <div>
          <h2 style={{ color: dataMeta.distance.color }}>{dataMeta.distance.label}</h2>
          <span>en {dataMeta.distance.unit}</span>
        </div>
        <ProgressBar
          value={data.distance}
          max={maxDistance}
          color={dataMeta.distance.color}
        />
        {/*<div className="evol">Évolution entre {national.période_précédente} et {national.période} : {evol('distance', data)}</div>*/}
        <ProgressBar
          value={data.distance_semaine}
          max={maxDistance}
          color={dataMeta.distance.color}
          label="semaine"
        />
        <ProgressBar
          value={data.distance_weekend}
          max={maxDistance}
          color={dataMeta.distance.color}
          label="week-end"
        />
        <ProgressBar
          value={national.distance[0]}
          previous={evolSimple(national.distance[0], data.distance)}
          max={maxDistance}
          color="#bbb"
          opacity="0.5"
          label="🇫🇷"
        />
        <div className="evol">Écart à la moyenne nationale</div>

        <div>
          <h2 style={{ color: dataMeta.vitesse.color }}>{dataMeta.vitesse.label}</h2>
          <span>en {dataMeta.vitesse.unit}</span>
        </div>
        <ProgressBar value={data.vitesse} max={maxs.vitesse} color={dataMeta.vitesse.color} />
        {/*<div className="evol">Évolution entre {national.période_précédente} et {national.période} : {evol('vitesse', data)}</div> */}
        <ProgressBar
          value={national.vitesse[0]}
          previous={evolSimple(national.vitesse[0], data.vitesse)}
          max={maxs.vitesse}
          color="#bbb"
          opacity="0.5"
          label="🇫🇷"
        />
        <div className="evol">Écart à la moyenne nationale</div>

        <div>
          <h2 style={{ color: dataMeta.durée.color }}>{dataMeta.durée.label}</h2>
          <span>en {dataMeta.durée.unit}</span>
        </div>
        <ProgressBar value={data.durée} max={maxs.durée} color={dataMeta.durée.color} />
        {/*<div className="evol">Évolution entre {national.période_précédente} et {national.période} : {evol('durée', data)}</div>*/}
        <ProgressBar
          value={national.durée[0]}
          previous={evolSimple(national.durée[0], data.durée)}
          max={maxs.durée}
          color="#bbb"
          opacity="0.5"
          label="🇫🇷"
        />
        <div className="evol">Écart à la moyenne nationale</div>

        <div>
          <h2 style={{ color: dataMeta.arrêt.color }}>{dataMeta.arrêt.label}</h2>
          <span>en {dataMeta.arrêt.unit}</span>
        </div>
        <ProgressBar value={data.arrêt} max={maxs.arrêt} color={dataMeta.arrêt.color} />
        {/*<div className="evol">Évolution entre {national.période_précédente} et {national.période} : {evol('arrêt', data)}</div>*/}
        <ProgressBar
          value={national.arrêt[0]}
          previous={evolSimple(national.arrêt[0], data.arrêt)}
          max={maxs.arrêt}
          color="#bbb"
          opacity="0.5"
          label="🇫🇷"
        />
        <div className="evol">Écart à la moyenne nationale</div>

        <div className="co2-saved">
          {formatInputNumber(data.co2, dataMeta.co2.unit)} {dataMeta.co2.label}
        </div>
      </div>

      <h2>Les voies fréquentées par les cyclistes</h2>
      <Segments data={data} />
      <p>* données récoltées sur le deuxième trimestre 2022, moyenne nationale sur l’année 2021 / 2022</p>
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
