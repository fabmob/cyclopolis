import correspondanceMétropoleVille from '../correspondanceMétropoleVille'

const endpointUrl = 'https://query.wikidata.org/sparql'
const getQuery = (cityName) => `#defaultView:ImageGrid
SELECT distinct ?item ?itemLabel ?itemDescription ?pic ?population ?area WHERE{  
  ?item ?label "${cityName}"@fr;
   wdt:P18 ?pic;
   wdt:P1082 ?population;
   wdt:P2046 ?area.
  ?article schema:about ?item .
  ?article schema:inLanguage "en" .
  ?article schema:isPartOf <https://en.wikipedia.org/>. 
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }    
}
 `

export default (cityName) => {
  const correspondance = correspondanceMétropoleVille[cityName]
  const queryCity = correspondance || cityName

  const query = getQuery(queryCity)

  const fullUrl = endpointUrl + '?query=' + encodeURIComponent(query)
  const headers = { Accept: 'application/sparql-results+json' }

  return fetch(fullUrl, { headers }).then((body) => body.json())
}
