import cyclopolisData from '../cyclopolisData'
import Emoji from './Emoji'

import { rawToNumber } from '../pages/villes/[name]'
const Context = ({ value, metric }) => {
  const data = cyclopolisData.map((o) => rawToNumber(o[metric])),
    min = Math.min(...data),
    max = Math.max(...data),
    cursor = rawToNumber(value)
  const position = ((cursor - min) / (max - min)) * 100

  return (
    <div
      css={`
        width: 100%;
        height: 1rem;
        bottom: 0;
        position: absolute;

        background: linear-gradient(90deg, white 0%, #ae0917ab 100%);
      `}
    >
      <span
        css={`
          position: absolute;
          left: ${position * 0.9}%;
          bottom: -0.1rem;
        `}
      >
        <Emoji e="📍" color />
      </span>
    </div>
  )
}

export default Context
