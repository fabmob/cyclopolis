import { rawToNumber, formatInputNumber } from '../pages/villes/[name].js'

const ProgressBar = ({ value, max, globalMax, color, small, label, previous, opacity }) => {
  globalMax = globalMax || max
  const width = (rawToNumber(value) / max) * 100
  const width_max = (rawToNumber(max) / globalMax) * 100
  let className = 'progress-bar'
  if (small) {
    className += ' small'
  }
  return (
    <div className={className} style={{ width: `${width_max}%` }}>
      <span
        className="progress-bar"
        style={{ width: `${width}%`, background: color }}
      >
        <span className="label">{formatInputNumber(value)}
        {previous && ` (${previous})`}
        </span>
      </span>
      <span style={{ width: `${100 - width}%` }}>
        <span className="label right" style={{opacity: opacity || 1}}>{label}</span>
      </span>
    </div>
  )
}

export default ProgressBar
