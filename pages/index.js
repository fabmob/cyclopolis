import Head from 'next/head'
import Layout, { siteDescription } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Search from '../components/Search'
import data from '../cyclopolisData'
import Carte from '../components/Carte'
import { useState } from 'react'

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
      <section className={utilStyles.headingMd}>
        <p>{siteDescription}</p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <Carte hover setGeo={regionClicked} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
