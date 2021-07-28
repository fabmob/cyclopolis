import Fuse from "fuse.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import correspondanceGéographique from "../correspondanceGéographique.csv";
import geoData from "../geoData";
import CarteDepartement from "./CarteDepartement";

const options = {
  keys: ["region"],
};
export default function ({ data }) {
  const [input, setInput] = useState("");
  const [fuse, setFuse] = useState(null);
  let [ing, setSearching] = useState(true);

  let validInput = input.length > 2;

  const searchResults = validInput ? fuse.search(input) : [];

  const searchResultShown = (validInput
    ? searchResults.map((el) => el.item)
    : data
  )
    .slice(0, 15)
    .map((el) => {
      const { région, département } = correspondanceGéographique.find(
        (c) => c.ville === el.region
      );
      return { ...el, codeRegion: région, codeDepartement: département };
    });

  useEffect(() => setFuse(new Fuse(data, options)), []);

  console.log(searchResultShown);

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
      🔎 &nbsp;
      <input
        value={input}
        placeholder="Une ville française"
        onChange={(e) => {
          let input = e.target.value;
          setInput(input);
        }}
      />
      {validInput && !searchResultShown.length && "Rien trouvé :("}
      <ul>
        {geoData
          .sort((a, b) => b.nom < a.nom)
          .map((region) => (
            <Region
              {...{
                searchResultShown,
                data: region,
                input,
                key: region.codeInsee,
              }}
            />
          ))}
      </ul>
    </div>
  );
}

const Region = ({ data, searchResultShown, input }) => {
  const filteredResults = searchResultShown.filter(
    (el) => el.codeRegion == data.codeInsee
  );
  console.log("FR", filteredResults);
  if (!filteredResults.length) return null;

  return (
    <li key={data.codeInsee}>
      <h3>{data.nom}</h3>
      <ul>
        {data.departements.map((d) => (
          <li key={d.codeInsee}>
            <Departement
              {...{
                filteredResults,
                data: d,
                input,
                key: d.numeroDepartement,
                codeRegion: data.codeInsee,
              }}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

const Departement = ({
  data,
  filteredResults: rawResults,
  input,
  codeRegion,
}) => {
  const filteredResults = rawResults.filter(
    (el) => el.codeDepartement == data.numeroDepartement
  );
  if (!filteredResults.length) return null;

  return (
    <li
      key={data.numeroDepartement}
      css={`
        display: flex;
        justify-content: start;
        align-items: center;
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 10rem;
          h4 {
            font-weight: normal;
            text-transform: uppercase;
          }
        `}
      >
        <h4>{data.nom}</h4>
        <CarteDepartement
          {...{
            codeRegion: codeRegion,
            codeDepartement: data.numeroDepartement,
          }}
        />
      </div>
      <ul>
        {filteredResults.map((city) => (
          <li key={city}>
            <Link href={"/villes/" + city.region}>
              <a>
                <Item data={city} input={input} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Item = ({ input, data }) => (
  <li
    key={data["region"]}
    css={`
      box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12),
        0 1px 2px rgba(41, 117, 209, 0.24);
      background: #fdfcff;
      padding: 0.6rem 1rem;
      margin: 1rem;
      list-style-type: none;
      border-radius: 0.6rem;
      display: flex;
      justify-content: start;
      align-items: center;
      > * {
        margin: 0 1rem;
      }
      width: 16rem;
    `}
  >
    <span>
      <Highlighter
        highlightStyle={{
          background: "#88c13e",
          color: "white",
          fontWeight: 400,
        }}
        searchWords={input.split(" ")}
        textToHighlight={data.region}
      />
    </span>
  </li>
);
