import Fuse from 'fuse.js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import geoData from '../geoData'
import Carte from './Carte'
import Emoji from '../components/Emoji'

export const getRegionCode = (string) => string.split(' - ')[0]

const options = {
  keys: ['area'],
  threshold: 0.4,
}
export default function Search({ data, activeRegion }) {
  const [input, setInput] = useState('')
  const [fuse, setFuse] = useState(null)

  let validInput = input.length > 2

  const searchResults = validInput ? fuse.search(input) : []

  const searchResultShown = (validInput
    ? searchResults.map((el) => el.item)
    : data
  ).map((el) => {
    return { ...el, codeRegion: getRegionCode(el['Région']) }
  })

  useEffect(() => setFuse(new Fuse(data, options)), [data])

  return (
    <div>
      <div className="search">
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
          <p>Votre collectivité n’est pas renseignée. </p>
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
                  (r) => getRegionCode(r[Région]) === a.codeInsee
                ) -
                searchResultShown.findIndex(
                  (r) => getRegionCode(r[Région]) === b.codeInsee
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
                active: region.slug === activeRegion
              }}
              key={region.codeInsee}
            />
          ))}
      </ul>
    </div>
  )
}

const Region = ({ data, searchResultShown, input, active}) => {
  const [expanded, setExpanded] = useState(input !== "")
  const toggle = () => { if (input === "") setExpanded(!expanded) }
  useEffect(() => {if (input !== "") setExpanded(input !== "") }, [input])
  useEffect(() => { setExpanded(active) }, [active])

  const filteredResults = searchResultShown.filter(
      (el) => el.codeRegion == data.codeInsee
  )
  if (!filteredResults.length) return null

  return (
    <li key={data.slug} className="region-cities">
      <div onClick={toggle} id={'search' + data.slug}>
        <div className="mini-map">
          <Carte regionSlug={data.slug} />
        </div>
        <h3>{data.nom}</h3>
      </div>
      {expanded && <ul>
        {filteredResults.map((city) => (
          <li key={city.area}>
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

const Item = ({ input, data}) => (
  <div key={data['region']} className="item" >
    <span>
      <Highlighter
        highlightStyle={{

        }}
        searchWords={input.split(' ')}
        textToHighlight={data.area}
      />
    </span>
  </div>
)
