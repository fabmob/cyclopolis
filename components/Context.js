import cyclopolis from '../cyclopolisData'
import Emoji from './Emoji'

import { rawToNumber } from '../pages/villes/[name]'
const Context = ({ value, metric, color }) => {
  const data = cyclopolis.map((o) => rawToNumber(o[metric])),
    min = Math.min(...data),
    max = Math.max(...data),
    cursor = rawToNumber(value)
  const position = ((cursor - min) / (max - min)) * 100

  return (
    <div
      className="context"
      style={{ background: `linear-gradient(90deg, white 0%, ${color} 100%)` }}
    >
      <span className="context-pin" style={{ left: `${position * 0.9}%` }}>
        <Emoji e="📍" color />
      </span>
    </div>
  )
}

export default Context
