import Link from 'next/link'
import Emoji from './Emoji'
import { formatInputNumber } from '../pages/villes/[name]'
import Context from './Context'
import { useState } from 'react'

export default ({
  meta: [key, { color, label, icon, unit: unitRaw }],
  data,
}) => {
  const [indicator, setIndicator] = useState(key)
  const [number, unit] = formatInputNumber(data[indicator], unitRaw)

  return (
    <Link href={'/indicateurs/' + indicator}>
      <li
        title="Comparer avec d'autres villes"
        css={`
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          padding-bottom: 1rem;
          h2 {
            text-transform: uppercase;
            font-weight: 300;
            margin: 0.4rem;
            font-size: 100%;
          }
          max-width: 14rem;
          h2 {
            max-width: 8rem;
            text-align: right;
          }
          @media (max-width: 800px) {
            max-width: 8rem;
            h2 {
              font-size: 90%;
              text-align: center;
              max-width: auto;
              text-align: center;
            }
            .emoji {
              font-size: 150%;
            }
          }
          box-shadow: 0 1px 3px rgba(209, 41, 41, 0.12),
            0 1px 2px rgba(209, 41, 41, 0.24);
          border: 2px solid black;
          border-radius: 0.2rem;
          margin: 0.6rem 0;
        `}
      >
        <div className="emoji" css=" margin: 0 .6rem;">
          <Emoji e={icon} sizeRem="3" />
        </div>
        <h2>{label} </h2>
        {indicator.includes('Distance moyenne') && (
          <div
            css={`
              width: 100%;
              display: flex;
              justify-content: center;
              button {
                cursor: zoom-in;
                margin: 0 0.4rem;
                border: 1px solid #444;
                padding: 0 0.2rem;
                line-height: 1rem;
                border-radius: 0.2rem;
                color: #444;
              }
            `}
          >
            <button
              css={`
                ${indicator === 'Distance moyenne en semaine'
                  ? 'background: #333; color: white !important;'
                  : ''};
              `}
              onClick={(e) => {
                setIndicator(
                  indicator !== 'Distance moyenne en semaine'
                    ? 'Distance moyenne en semaine'
                    : 'Distance moyenne'
                )
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              semaine
            </button>
            <button
              css={`
                ${indicator === 'Distance moyenne en week-end'
                  ? 'background: #333; color: white !important;'
                  : ''};
              `}
              onClick={(e) => {
                setIndicator(
                  indicator !== 'Distance moyenne en week-end'
                    ? 'Distance moyenne en week-end'
                    : 'Distance moyenne'
                )

                e.preventDefault()
                e.stopPropagation()
              }}
            >
              weekend
            </button>
          </div>
        )}

        <div css="display: flex; flex-wrap : wrap; align-items: center; justify-content: space-evenly">
          <span css="font-size: 200%">{number}</span>
          <span css="margin-left: .4rem">{unit}</span>
        </div>
        <Context
          {...{ value: data[indicator], metric: indicator, color: color }}
        />
      </li>
    </Link>
  )
}
