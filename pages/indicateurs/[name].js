import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/layout'
import {
  AllSegments,
  getSegments,
} from '../../components/Segments'
import cyclopolisData, { simplifyNames } from '../../cyclopolisData'
import { rawToNumber, dataMeta, formatInputNumber } from '../villes/[name].js'

export default function Indicateur({ key, data }) {
  const [period, setPeriod] = useState('summer');

  const max = Math.max(...data.values[period].map(([, v]) => rawToNumber(v)))
  return (
    <Layout>
      <br />
      <div>
        <input type="radio" id="summer" name="period" value="summer" checked={period==='summer'} onClick={() => setPeriod('summer')} />
        <label htmlFor="summer">Été</label>
        <input type="radio" id="fall" name="period" value="fall" checked={period==='fall'} onClick={() => setPeriod('fall')} />
        <label htmlFor="fall">Automne</label>
      </div>

      <ul className='indicateurs-list'>
        {Object.entries(dataMeta).map(([key, { color, label }]) => (
          <li key={label}>
            <button className="tab-button" style={{background: color}}>
              <Link href={'/indicateurs/' + key}>{label}</Link>
            </button>
          </li>
        ))}
        <li key="segments">
          <button className="tab-button" style={{backgound: '#0652DD'}}>
            <Link href={'/indicateurs/segments'}>Voies les + fréquentées</Link>
          </button>
        </li>
      </ul>
      <h1>
        {data.label || 'Les voies les plus fréquentées par les cyclistes'}
        {data.unit && (
          <small>
            en {data.unit}
          </small>
        )}
      </h1>
      <p>{data.description}</p>
      <ul>
        {data.key !== 'segments' ? (
          data.values[period]
            .sort(([, a], [, b]) => rawToNumber(b) - rawToNumber(a))
            .map(([ville, valeur]) => {
              const width = (rawToNumber(valeur) / max) * 80
              return (
                <li key={ville}>
                  <Link href={'/villes/' + ville}>
                    <a>
                      <span className="ville-indicateurs">
                        {simplifyNames(ville)}
                      </span>
                    </a>
                  </Link>
                  <div className="progress-bar">
                    <span className="progress-bar" style={{width: `${width}%`, background: data.color}}/>
                    <span>{formatInputNumber(valeur)}</span>
                  </div>
                </li>
              )
            })
        ) : (
          <AllSegments data={data.values[period]} />
        )}
      </ul>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllIndicateurs()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  if (params.name === 'segments') {
    const yo = {
      props: {
        data: {
          values: {
            summer: cyclopolisData.summer.map((el) => [el.area, getSegments(el)]),
            fall: cyclopolisData.fall.map((el) => [el.area, getSegments(el)]),
          },
          key: 'segments',
        },
      },
    }
    return yo
  }
  const indicateur = Object.entries(dataMeta).find(
    ([key, data]) => key === params.name
  )

  console.log(params)

  return {
    props: {
      data: {
        values: {
          summer: cyclopolisData.summer.map((city) => [city.area, city[indicateur[0]]]),
          fall: cyclopolisData.fall.map((city) => [city.area, city[indicateur[0]]]),
        },
        key: params.name, ...indicateur[1]
      },
    },
  }
}

export function getAllIndicateurs() {
  return [
    ...Object.keys(dataMeta).map((name) => {
      return {
        params: {
          name,
        },
      }
    }),
    { params: { name: 'segments' } },
  ]
}
