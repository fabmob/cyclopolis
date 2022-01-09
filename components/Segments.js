import { useState } from 'react'
import { TabButton } from '../pages'

import Emoji from '../components/Emoji'
import styled from 'styled-components'
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
                  <SegmentName>{v}</SegmentName>
                </li>
              </a>
            )
        )}
      </ul>
      {!more && <TabButton onClick={() => setMore(true)}>Voir plus</TabButton>}
    </div>
  )
}

export default Segments

export const SegmentName = styled.span`
  box-shadow: 0 1px 3px rgba(209, 41, 41, 0.12),
    0 1px 2px rgba(41, 117, 209, 0.24);
  margin-left: 0.6rem;
  border-radius: 0.5rem;
  padding: 0.1rem 1rem;
  @media (max-width: 800px) {
    max-width: 12rem;
    display: inline-block;
  }
`

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
            <SegmentName>{segment}</SegmentName>
          </li>
        ))}
      </ul>
    </li>
  ))
