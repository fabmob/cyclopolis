import Link from 'next/link'
import Layout from '../../components/layout'
import { AllSegments, getSegments } from '../../components/Segments'
import cyclopolisData, { simplifyNames } from '../../cyclopolisData'
import { rawToNumber, dataMeta } from '../villes/[name].js'
import ProgressBar from '../../components/ProgressBar'

export default function Indicateur({ data }) {
  const max_cur = Math.max(...data.values.map(([, v]) => rawToNumber(v)))
  const max_prec = Math.max(...data.values.map(([, , v]) => rawToNumber(v)))
  const max = Math.max(max_cur, max_prec)
  return (
    <Layout page="indicateurs">
      <br />

      <ul className="indicateurs-list">
        {Object.entries(dataMeta).map(([key, { color, label }]) => (
          <li key={label}>
            <button className="tab-button" style={{ background: color }}>
              <Link href={'/indicateurs/' + key}>{label}</Link>
            </button>
          </li>
        ))}
        <li key="segments">
          <button className="tab-button" style={{ backgound: '#0652DD' }}>
            <Link href={'/indicateurs/segments'}>Voies les + fréquentées</Link>
          </button>
        </li>
      </ul>
      <h1>
        {data.label || 'Les voies les plus fréquentées par les cyclistes'}
        {data.unit && <small>en {data.unit}</small>}
      </h1>
      <p>{data.description}</p>
      <p>
        Les valeurs données correspondent à <em>l’automne 2021</em>.<br/>
        En dessous sont indiquées les valeurs pour <em>hiver 2021/2022</em>.
      </p>
      <ul>
        {data.key !== 'segments' ? (
          data.values
            .sort(([, a], [, b]) => rawToNumber(b) - rawToNumber(a))
            .map(([ville, valeur, valeur_prec]) => {
              return (
                <li key={ville}>
                  <Link href={'/villes/' + ville}>
                    <a>
                      <span className="ville-indicateurs">
                        {simplifyNames(ville)}
                      </span>
                    </a>
                  </Link>
                  <ProgressBar
                    value={valeur}
                    max={max_cur}
                    globalMax={max}
                    color={data.color}
                  />
                  <ProgressBar
                    value={valeur_prec}
                    max={max_prec}
                    globalMax={max}
                    color={data.color}
                    small
                  />
                </li>
              )
            })
        ) : (
          <AllSegments data={data.values} />
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
    return {
      props: {
        data: {
          values: cyclopolisData.map((el) => [el.area, getSegments(el)]),
          key: 'segments',
        },
      },
    }
  }

  return {
    props: {
      data: {
        values: cyclopolisData.map((city) => [
          city.area,
          city[params.name],
          city[params.name + '_prec'],
        ]),
        key: params.name,
        ...dataMeta[params.name],
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
