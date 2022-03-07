import Head from 'next/head'
import Layout, { siteDescription } from '../components/layout'
import Search from '../components/Search'
import data from '../cyclopolisData'
import national from '../national.json'
import {dataMeta, frenchNumber, formatInputNumber} from './villes/[name].js'
import Carte from '../components/Carte'
import { useState } from 'react'

const evol = (current, prev) => {
  const val = ((current - prev) * 100) / prev
  if (val > 0) {
    return '+' + frenchNumber(val) + ' %'
  }
  return frenchNumber(val) + ' %'
}

export default function Home({ data }) {
  const [activeRegion, setActiveRegion] = useState(null)
  function regionClicked(slug) {
    const div = document.getElementById('search' + slug)
    if (div) {
      setActiveRegion(slug)
      document.getElementById('search' + slug).scrollIntoView()
    }
  }
  return (
    <Layout page="territoires">
      <Head>
        <title>{siteDescription}</title>
      </Head>
      <div id="national-indicators">
        <p>Indicateurs nationaux pour l’automne 2021 et son évolution par rapport à l’été 2021</p>
        <h2 style={{ color: '#81b5dc' }}>{dataMeta.distance.label}</h2>
        <p>{frenchNumber(national.distance[0])} {dataMeta.distance.unit}
        <small>Évolution : {evol(national.distance[0], national.distance[1])}</small>
        </p>

        <h2 style={{ color: '#cb5454' }}>{dataMeta.vitesse.label}</h2>
        <p>{frenchNumber(national.vitesse[0])} {dataMeta.vitesse.unit}
        <small>Évolution : {evol(national.vitesse[0], national.vitesse[1])}</small>
        </p>

        <h2 style={{ color: '#cb5454' }}>{dataMeta.arrêt.label}</h2>
        <p>{frenchNumber(national.arrêt[0])} {dataMeta.arrêt.unit}
        <small>Évolution : {evol(national.arrêt[0], national.arrêt[1])}</small>
        </p>

        <h2 style={{ color: '#6c9571' }}>Nombre de territoirs référencés</h2>
        <p>{frenchNumber(national.territoirs_referencés[0])}
        <small>Évolution : {evol(national.territoirs_referencés[0], national.territoirs_referencés[1])}</small>
        </p>


      </div>
      <section>
        <p>{siteDescription}</p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <Carte hover setGeo={regionClicked} />
      <section>
        <Search data={data} activeRegion={activeRegion} />
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      data,
    },
  }
}
