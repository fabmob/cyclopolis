import Emoji from '../components/Emoji'
import Link from 'next/link'
export const getSegments = (data) => [
  {name: data.classement_1, city: data.city_1},
  {name: data.classement_2, city: data.city_2},
  {name: data.classement_3, city: data.city_3},
  {name: data.classement_4, city: data.city_4},
  {name: data.classement_5, city: data.city_5},
]


const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
const Segments = ({ data }) => {
  const segments = getSegments(data)
  return (
    <div>
      <ul className="medals">
        {segments.map(({name, city}, i) => (
          <a
            key={name}
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/search?query=${name}, ${city}`}
          >
            <li className="medals">
              <span className="emoji-medal">
                <Emoji color e={medals[i + 1]} />
              </span>
              <span className="segment">{name}</span>
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
        {segments.map(({name, city}, index) => (
          <li key={index}>
            {index < 3 ? (
              <Emoji sizeRem="1.5" color e={medals[index + 1]} />
            ) : (
              <span style={{ width: '1.5rem', display: 'inline-block' }}></span>
            )}
            <span className="segment">{name}({city})</span>
          </li>
        ))}
      </ul>
    </li>
  ))
