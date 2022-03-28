import correspondanceMétropoleVille from '../correspondanceMétropoleVille'
import Image from 'next/image'

const Header = ({ name, wikidata, data }) => {

  const imageURL = data['Image'] || wikidata?.pic.value

  const population = data['Population '] || wikidata?.population?.value
  return (
    <header>
      <div>
        <h1>{name}</h1>
      </div>
      <div className="city-image">
        {imageURL && <Image src={imageURL} className="city-image" alt="Panorama de la ville"/>}
      </div>
      <div className="city-stats">
        {population && (
          <div className="population">
            {(+population).toLocaleString('fr-FR')} habitants
          </div>
        )}
        {wikidata?.area && !correspondanceMétropoleVille[data.area] && (
          <div className="area">
            {(+wikidata.area.value).toLocaleString('fr-FR')} km²
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
