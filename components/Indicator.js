import Link from 'next/link'
import Emoji from './Emoji'
import { formatInputNumber, rawToNumber } from '../pages/villes/[name]'
import Context from './Context'
import { useState } from 'react'

function evolution(current, previous) {
  if(previous === '') {
    return null
  } else {
    const val = rawToNumber(previous)
    const pct = Math.round((current - val) * 100 / current)
    const sign = pct > 0 ? '+' : ''
    return `(${sign}${pct} %)`
  }
}

const Indicator = ({
  meta: [key, { color, label, icon, unit: unitRaw }],
  data,
}) => {
  const [indicator, setIndicator] = useState(key)
  const [number, unit] = formatInputNumber(data[indicator], unitRaw)
  const evol = evolution(data[indicator], data[indicator + '_prec'])

  const selected = {
    background: '#333',
    color: 'white'
  }

  return (
    <Link href={'/indicateurs/' + indicator} passHref>
      <li className="indicateurs" >
        <div className="emoji indicateur-emoji">
          <Emoji e={icon} sizeRem="3" />
        </div>
        <h2>{label}</h2>
        {indicator.includes('distance') && (
          <div className="indicateur">
            <button
              style={indicator == 'distance_semaine' ? selected : {}}
              onClick={(e) => {
                setIndicator(
                  indicator !== 'distance_semaine'
                    ? 'distance_semaine'
                    : 'distance'
                )
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              semaine
            </button>
            <button
              style={indicator == 'distance_weekend' ? selected : {}}
              onClick={(e) => {
                setIndicator(
                  indicator !== 'distance_weekend'
                    ? 'distance_weekend'
                    : 'distance'
                )

                e.preventDefault()
                e.stopPropagation()
              }}
            >
              weekend
            </button>
          </div>
        )}

        <div>
          <span style={{fontSize: '200%'}}>{number}</span>
          <span style={{marginLeft: '.4rem'}}>{unit}</span>
          <span style={{fontSize: '50%'}}>{evol}</span>
        </div>
        <Context
          value={data[indicator]}
          metric={indicator}
          color={color}
        />
      </li>
    </Link>
  )
}

export default Indicator;
