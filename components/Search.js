import Fuse from 'fuse.js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import geoData from '../geoData'
import { Carte } from '../pages/carte'
import Emoji from '../components/Emoji'

export const getRegionCode = (string) => string.split(' - ')[0]

const options = {
  keys: ['area'],
  threshold: 0.4,
}
export default function Search({ data }) {
  const [input, setInput] = useState('')
  const [fuse, setFuse] = useState(null)

  let validInput = input.length > 2

  const searchResults = validInput ? fuse.search(input) : []

  const searchResultShown = (validInput
    ? searchResults.map((el) => el.item)
    : data
  ).map((el) => {
    return { ...el, codeRegion: getRegionCode(el['REGION']) }
  })

  useEffect(() => setFuse(new Fuse(data, options)), [])

  return (
    <div>
      <div css="display: flex; align-items: center; justify-content: center">
        <Emoji e="🔎" /> &nbsp;
        <input
          value={input}
          placeholder="Une ville française"
          onChange={(e) => {
            let input = e.target.value
            setInput(input)
          }}
        />
      </div>
      {validInput && !searchResultShown.length && (
        <>
          <p>Votre collectivité n'est pas renseignée. </p>
          <p>
            <a href="https://villes-cyclables.org/contactez-nous">
              Contactez-nous
            </a>
            .
          </p>
        </>
      )}
      <ul>
        {geoData
          .sort((a, b) =>
            validInput
              ? searchResultShown.findIndex(
                  (r) => getRegionCode(r.REGION) === a.codeInsee
                ) -
                searchResultShown.findIndex(
                  (r) => getRegionCode(r.REGION) === b.codeInsee
                )
              : a.nom < b.nom
              ? -1
              : 1
          )
          .map((region) => (
            <Region
              {...{
                searchResultShown,
                data: region,
                input,
              }}
              key={region.codeInsee}
            />
          ))}
      </ul>
    </div>
  )
}

const Region = ({ data, searchResultShown, input }) => {
  const filteredResults = searchResultShown.filter(
    (el) => el.codeRegion == data.codeInsee
  )
  if (!filteredResults.length) return null

  return (
    <li key={data.codeInsee} className="region-cities">
      <div onClick={toggle}>
        <div css="width: 3rem; margin-right: .6rem">
          <Carte showRegion={data.codeInsee} />
        </div>
        <h3>{data.nom}</h3>
      </div>
      {expanded && <ul>
        {filteredResults.map((city) => (
          <li key={city}>
            <Link href={'/villes/' + city.area}>
              <a>
                <Item data={city} input={input} />
              </a>
            </Link>
          </li>
        ))}
      </ul>}
    </li>
  )
}

const Item = ({ input, data, departement }) => (
  <div key={data['region']} className="item" >
    <span>
      <Highlighter
        highlightStyle={{
          background: '#88c13e',
          color: 'white',
          fontWeight: 400,
        }}
        searchWords={input.split(' ')}
        textToHighlight={data.area}
      />
      {departement && <h4>{departement && departement.nom}</h4>}
    </span>
  </div>
)
