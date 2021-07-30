import styled from "styled-components";
const Header = ({ name, wikidata }) => (
  <header
    css={`
      position: relative;
      margin-bottom: 1rem;
      height: 9rem; /* dunno why this is necessary to not overlap content*/
      @media (max-width: 800px) {
        height: 4rem;
      }

      h1 {
        position: absolute;
        z-index: 1;
        background: #00000075;
        color: white;
        padding: 0 0.6rem;
        font-size: 250%;
        @media (max-width: 800px) {
          font-size: 180%;
        }
        margin: 0;
        top: 0;
      }
    `}
  >
    {wikidata?.pic && <CityImage src={wikidata.pic.value} />}
    <h1>{name}</h1>
    {false && wikidata?.population && (
      <p>{(+wikidata.population.value).toLocaleString()} hab.</p>
    )}
  </header>
);
const CityImage = styled.img`
  width: 100%;
  position: absolute;
  object-fit: cover;
  max-height: 10rem;
  @media (max-width: 800px) {
    max-height: 6rem;
  }
`;

export default Header;
