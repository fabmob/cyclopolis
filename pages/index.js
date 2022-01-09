import Head from 'next/head'
import Layout, { siteDescription } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Search from '../components/Search'
import data from '../cyclopolisData'
import Link from 'next/link'

export default function Home({ data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteDescription}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p css="text-align: center">{siteDescription}</p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <Menu />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Search data={data} />
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

export const Menu = () => (
  <div className="menu">
    <button className="tab-button">
      <Link href="/">Vue liste</Link>
    </button>
    <button className="tab-button">
      <Link href="/carte">Vue carte</Link>
    </button>
    <button className="tab-button">
      <Link href="/indicateurs/vitesse">Vue indicateurs</Link>
    </button>
    <button className="tab-button">
      <Link href="/a-propos">À propos</Link>
    </button>
  </div>
)
