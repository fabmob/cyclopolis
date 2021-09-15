import Head from 'next/head'
import Layout, { siteDescription } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Search, { getRegionCode } from '../components/Search'
import data, { simplifyNames } from '../cyclopolisData'
import geoData from '../geoData'
import { useState } from 'react'
import { Menu } from './index.js'
import Link from 'next/link'

const departementLabel = (codeDepartement, codeRegion) => {
  console.log(codeDepartement, codeRegion)
  const region = geoData.find((r) => r.codeInsee == codeRegion)

  if (!region) return {}

  return {
    region: region.nom,
    departement: region.departements.find(
      (d) => d.numeroDepartement === codeDepartement
    ).nom,
  }
}

export default function Home({ data }) {
  const [geo, setGeo] = useState(null)
  const citiesFound = !geo
    ? []
    : data.filter(({ REGION }) => getRegionCode(REGION) === geo.region)

  const plural = citiesFound && citiesFound.length > 1 ? 's' : ''
  const { region, departement } = geo
    ? departementLabel(geo.departement, geo.region)
    : {}
  return (
    <Layout home>
      <Head>
        <title>{siteDescription}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p css="text-align: center">{siteDescription}</p>
      </section>
      <Menu />
      {/* Add this <section> tag below the existing <section> tag */}
      {geo && (
        <>
          <p>
            <strong>{region}</strong> <small>{departement}</small>
          </p>
          {!citiesFound.length && <p>Pas de données pour cette région.</p>}
          {citiesFound.length > 0 && (
            <p>
              Ville{plural} trouvée{plural} :{' '}
              <ul
                css={`
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    margin: 0 1rem;
                  }
                `}
              >
                {citiesFound.map((c) => (
                  <li key={c.area}>
                    <Link href={`/villes/${c.area}`}>
                      {simplifyNames(c.area)}
                    </Link>
                  </li>
                ))}
              </ul>
            </p>
          )}
        </>
      )}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Carte setGeo={setGeo} />
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

export const Carte = ({
  outreMer = false,
  setGeo = () => null,
  showRegion = false,
}) => (
  <div
    css={`
      path {
        ${showRegion
          ? `
stroke: #aaa;
stroke-opacity: 1;
fill: #aaa;
stroke-width: 2px;
`
          : `
        stroke: white;
        stroke-width: 1px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-opacity: 0.25;
        fill: #aaa;
		`}
      }
      g:hover path {
        fill: #ae0917;
      }

      path.exists {
        fill: #86eee0;
      }
      g.spotlight path {
        fill: #ae0917;
      }
    `}
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={`${outreMer ? '0' : '80'} 0 667 578`}
      xmlSpace="preserve"
    >
      {geoData.map((region) => (
        <g
          key={region.codeInsee}
          className={
            'region region-' +
            region.codeInsee +
            (showRegion == region.codeInsee ? ` spotlight` : '')
          }
          data-nom={region.nom}
          data-code_insee={region.codeInsee}
        >
          {region.departements.map((departement) => (
            <path
              key={departement.nom}
              data-nom={departement.nom}
              data-numerodepartement={departement.numeroDepartement}
              className={`region-${region.codeInsee} departement departement-${departement.codeInsee} departement-${departement.nom}`}
              d={departement.d}
              onClick={() =>
                setGeo({
                  region: region.codeInsee,
                  departement: departement.numeroDepartement,
                })
              }
            ></path>
          ))}
        </g>
      ))}
    </svg>
  </div>
)
