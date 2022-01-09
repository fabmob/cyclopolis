import { useState } from 'react'
import { TabButton } from '../pages'

import Emoji from '../components/Emoji'
import Link from 'next/link'
export const getSegments = (data) =>
  Object.entries(data).filter(([key]) => key.includes('classement_'))

const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
const Segments = ({ data, city }) => {
  const [more, setMore] = useState(false)
  const segments = getSegments(data)
  return (
    <div>
      <ul
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        {segments.map(
          ([, v], i) =>
            (more || i < 3) && (
              <a
                href={`https://www.openstreetmap.org/search?query=${v}, ${city}`}
              >
                <li
                  key={v}
                  css={`
                    display: inline-block;
                    margin-bottom: 0.3rem;
                  `}
                >
                  {
                    <span css="display: inline-block; text-align: center; width: 2rem; font-size: 130%">
                      <Emoji color e={medals[i + 1]} />
                    </span>
                  }
                  <span className="segment">{v}</span>
                </li>
              </a>
            )
        )}
      </ul>
      {!more && <button className="tab-button" onClick={() => setMore(true)}>Voir plus</button>}
    </div>
  )
}

export default Segments

export const AllSegments = ({ data }) =>
  data.values.map(([ville, segments]) => (
    <li key={ville} css="margin: 1rem">
      <Link href={'/villes/' + ville}>{ville}</Link>
      <ul
        css={`
          margin-top: 0.6rem;
          display: flex;

          flex-wrap: wrap;
          li {
            margin: 0.1rem 1rem;
          }
        `}
      >
        {segments.map(([_, segment], index) => (
          <li key={index}>
            {index < 3 ? (
              <Emoji sizeRem="1.5" color e={medals[index + 1]} />
            ) : (
              <span css="width: 1.5rem; display: inline-block"></span>
            )}
            <span className="segment">{segment}</span>
          </li>
        ))}
      </ul>
    </li>
  ))
