import cyclopolisData from '../cyclopolisData'

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

        background: linear-gradient(90deg, #0c7ee8 0%, #5fe49b 100%);
      `}
    >
      <span
        css={`
          position: absolute;
          left: ${position}%;
          bottom: -0.1rem;
          font-size: 120%;
        `}
      >
        📍
      </span>
    </div>
  )
}

export default Context
