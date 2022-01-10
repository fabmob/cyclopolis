import { useState } from 'react'
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
      <ul className="medals">
        {segments.map(
          ([, v], i) =>
            (more || i < 3) && (
              <a
                key={v}
                href={`https://www.openstreetmap.org/search?query=${v}, ${city}`}
              >
                <li className="medals">
                  <span className="emoji-medal">
                    <Emoji color e={medals[i + 1]} />
                  </span>
                  <span className="segment">{v}</span>
                </li>
              </a>
            )
        )}
      </ul>
      {!more && <button style={{color: 'white'}} className="tab-button" onClick={() => setMore(true)}>Voir plus</button>}
    </div>
  )
}

export default Segments

export const AllSegments = ({ data }) =>
  data.values.map(([ville, segments]) => (
    <li key={ville} className="segments-list">
      <Link href={'/villes/' + ville}>{ville}</Link>
      <ul>
        {segments.map(([_, segment], index) => (
          <li key={index}>
            {index < 3 ? (
              <Emoji sizeRem="1.5" color e={medals[index + 1]} />
            ) : (
              <span style={{width: '1.5rem', display: 'inline-block'}}></span>
            )}
            <span className="segment">{segment}</span>
          </li>
        ))}
      </ul>
    </li>
  ))
