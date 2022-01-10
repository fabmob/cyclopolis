import Link from 'next/link'
import Context from '../../components/Context'
import Layout from '../../components/layout'
import Segments, {
  AllSegments,
  getSegments,
  SegmentName,
} from '../../components/Segments'
import cyclopolisData, { simplifyNames } from '../../cyclopolisData'
import { rawToNumber, dataMeta, formatInputNumber } from '../villes/[name].js'

export default function Indicateur({ key, data }) {
  const max = Math.max(...data.values.map(([, v]) => rawToNumber(v)))
  return (
    <Layout>
      <br />
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
          data.values
            .sort(([, a], [, b]) => rawToNumber(b) - rawToNumber(a))
            .map(([ville, valeur]) => {
              const width = (rawToNumber(valeur) / max) * 80
              return (
                <li
                  key={ville}
                  css={`
                    margin-bottom: 0.6rem;
                  `}
                >
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
          <AllSegments data={data} />
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
          values: cyclopolisData.map((el) => [el.area, getSegments(el)]),
          key: 'segments',
        },
      },
    }
    return yo
  }
  const indicateur = Object.entries(dataMeta).find(
    ([key, data]) => key === params.name
  )

  const values = cyclopolisData.map((city) => [city.area, city[indicateur[0]]])
  return {
    props: {
      data: { values, key: params.name, ...indicateur[1] },
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
