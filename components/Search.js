import Fuse from 'fuse.js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import geoData from '../geoData'
import { Carte } from '../pages/carte'
import CarteDepartement from './CarteDepartement'
import Emoji from '../components/Emoji'

export const getRegionCode = (string) => string.split(' - ')[0]

const options = {
  keys: ['area'],
  threshold: 0.4,
}
export default function Search({ data }) {
  const [input, setInput] = useState('')
  const [fuse, setFuse] = useState(null)
  let [ing, setSearching] = useState(true)

  let validInput = input.length > 2

  const searchResults = validInput ? fuse.search(input) : []

  const searchResultShown = (validInput
    ? searchResults.map((el) => el.item)
    : data
  ).map((el) => {
    return { ...el, codeRegion: getRegionCode(el['REGION']) }
  })

  useEffect(() => setFuse(new Fuse(data, options)), [])
  console.log(searchResults)

  return (
    <div
      css={`
        input {
          border: 1px solid dark-blue;
          border-radius: 0.3rem;
          padding: 0.1rem 0.6rem;
          font-size: 100%;
          border-style: solid;
          margin-left: 1rem;
          max-width: 70%;
          display: inline;
        }
      `}
    >
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
    <li
      key={data.codeInsee}
      css={`
        margin-bottom: 2rem;
        box-shadow: 0 1px 3px rgba(77, 21, 21, 0.12),
          0 1px 2px rgba(47, 33, 33, 0.24);
        background: #eee;
        border-radius: 0.6rem;
        padding: 0 0.6rem 1rem;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <div css="width: 3rem; margin-right: .6rem">
          <Carte showRegion={data.codeInsee} />
        </div>
        <h3>{data.nom}</h3>
      </div>
      <ul
        css={`
          display: flex;
          align-items: center;
          flex-direction: column;
        `}
      >
        {filteredResults.map((city) => (
          <li key={city}>
            <Link href={'/villes/' + city.area}>
              <a>
                <Item data={city} input={input} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

const Item = ({ input, data, departement }) => (
  <div
    key={data['region']}
    css={`
      box-shadow: 0 1px 3px rgba(209, 41, 41, 0.12),
        0 1px 2px rgba(41, 117, 209, 0.24);
      background: #fdfcff;
      padding: 0.6rem 0.1rem;
      margin: 0.3rem;
      list-style-type: none;
      border-radius: 0.6rem;
      display: flex;
      justify-content: start;
      align-items: center;
      > * {
        margin: 0 1rem;
      }
      width: 20rem;
      @media (max-width: 800px) {
        width: 16rem;
      }

      h4 {
        font-weight: 500;
        color: #444;
        text-transform: uppercase;
        margin: 0.4rem;
        font-size: 60%;
        display: inline;
      }
    `}
  >
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
