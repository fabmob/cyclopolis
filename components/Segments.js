import { useState } from 'react'
import { TabButton } from '../pages'

import Emoji from '../components/Emoji'

const Segments = ({ data, city }) => {
  const [more, setMore] = useState(false)
  const segments = Object.entries(data).filter(([key]) =>
    key.includes('classement_')
  )

  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
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
                  <span
                    css={`
                      box-shadow: 0 1px 3px rgba(209, 41, 41, 0.12),
                        0 1px 2px rgba(41, 117, 209, 0.24);
                      margin-left: 0.6rem;
                      border-radius: 0.5rem;
                      padding: 0.1rem 1rem;
                    `}
                  >
                    {v}
                  </span>
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
