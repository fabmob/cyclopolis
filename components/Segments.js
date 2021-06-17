export default ({ data, city }) => {
  const segments = Object.entries(data).filter(([key]) =>
    key.includes("classement_")
  );

  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  return (
    <ul
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      {segments.map(([, v], i) => (
        <a href={`https://www.openstreetmap.org/search?query=${v}, ${city}`}>
          <li
            key={v}
            css={`
              display: inline-block;
              box-shadow: 0 1px 3px rgb(41 117 209 / 12%),
                0 1px 2px rgb(41 117 209 / 24%);
              margin: 0.8rem 0;
              border-radius: 0.5rem;
              padding: 0.1rem 1rem;
            `}
          >
            {
              <span css=" display: inline-block; text-align: center">
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
