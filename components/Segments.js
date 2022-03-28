import { useState } from 'react'
import Emoji from '../components/Emoji'
import Link from 'next/link'
export const getSegments = (data) =>
  Object.entries(data).filter(([key]) => key.includes('classement_'))

const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
const Segments = ({ data, city }) => {
  const segments = getSegments(data)
  return (
    <div>
      <ul className="medals">
        {segments.map(([, v], i) => (
          <a
            key={v}
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/search?query=${v}, ${city}`}
          >
            <li className="medals">
              <span className="emoji-medal">
                <Emoji color e={medals[i + 1]} />
              </span>
              <span className="segment">{v}</span>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}

export default Segments

export const AllSegments = ({ data }) =>
  data.map(([ville, segments]) => (
    <li key={ville} className="segments-list">
      <Link href={'/villes/' + ville}>{ville}</Link>
      <ul>
        {segments.map(([_, segment], index) => (
          <li key={index}>
            {index < 3 ? (
              <Emoji sizeRem="1.5" color e={medals[index + 1]} />
            ) : (
              <span style={{ width: '1.5rem', display: 'inline-block' }}></span>
            )}
            <span className="segment">{segment}</span>
          </li>
        ))}
      </ul>
    </li>
  ))
