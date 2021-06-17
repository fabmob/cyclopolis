const endpointUrl = "https://query.wikidata.org/sparql";
const getQuery = (cityName) => `#defaultView:ImageGrid
SELECT distinct ?item ?itemLabel ?itemDescription ?pic WHERE{  
  ?item ?label "${cityName}"@fr;
   wdt:P18 ?pic.
  ?article schema:about ?item .
  ?article schema:inLanguage "en" .
  ?article schema:isPartOf <https://en.wikipedia.org/>. 
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }    
}
 `;

export default (cityName) => {
  const query = getQuery(cityName);

  const fullUrl = endpointUrl + "?query=" + encodeURIComponent(query);
  const headers = { Accept: "application/sparql-results+json" };

  return fetch(fullUrl, { headers }).then((body) => body.json());
};
