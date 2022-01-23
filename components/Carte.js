import geoData from '../geoData'

const Carte = ({ regionSlug = null, hover = false, setGeo = () => null }) => {
  let classes = []
  if (regionSlug) classes.push(regionSlug)
  if (hover) classes.push('hover')
  return (
    <svg
      width="927.17279"
      height="758.78992"
      strokeLinecap="round"
      strokeLinejoin="round"
      id="france"
      viewBox="0 0 927.17279 758.78992"
      xmlns="http://www.w3.org/2000/svg"
      className={hover ? 'hover' : ''}
    >
      {geoData.map((region) => (
        <path
          key={region.id}
          transform={region.transform}
          id={region.id}
          d={region.d}
          className={regionSlug === region.slug ? 'active' : ''}
          onClick={() => setGeo(region.slug)}
        />
      ))}
    </svg>
  )
}

export default Carte
