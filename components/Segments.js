export default ({ data, city }) => {
  const segments = Object.entries(data).filter(([key]) =>
    key.includes("classement_")
  );

  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  return (
    <ul>
      {segments.map(([, v], i) => (
        <a href={`https://www.openstreetmap.org/search?query=${v}, ${city}`}>
          <li
            key={v}
            css={`
              box-shadow: rgba(41, 117, 209, 0.15) 0px 2px 4px -1px,
                rgba(41, 117, 209, 0.14) 0px 4px 5px 0px,
                rgba(41, 117, 209, 0.12) 0px 1px 10px 0px;
              margin: 0.4rem 0;
              border-radius: 0.5rem;
              padding: 0 0.2rem;
            `}
          >
            {
              <span css="width: 2rem; display: inline-block; text-align: center">
                {medals[i + 1]}
              </span>
            }
            {v}
          </li>
        </a>
      ))}
    </ul>
  );
};
