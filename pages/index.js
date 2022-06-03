import Head from 'next/head'
import Layout, { siteDescription } from '../components/layout'
import Search from '../components/Search'
import data from '../cyclopolisData'
import Carte from '../components/Carte'
import { useState } from 'react'
import national from '../national.json'
import { frenchNumber } from './villes/[name].js'

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
      <section>
        <p>{siteDescription}</p>
      </section>
      <section className="national">
        <h3>Indicateurs nationaux</h3>
        <p>Les moyennes affichées proviennent de la circulation vélo constatée dans les {national.territoirs_referencés[0]} territoires référencés.</p>
        <ul>
        <li>Durée moyenne du trajet : <em>{frenchNumber(national.durée[0])} minutes</em></li>
        <li>Distance moyenne : <em>{frenchNumber(national.distance[0])} km </em> </li>
        <li>Vitesse moyenne : <em>{frenchNumber(national.vitesse[0])} km/h</em></li>
      </ul>
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
