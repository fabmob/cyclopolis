export default ({ data }) => {
  const segments = Object.entries(data).filter(([key]) =>
    key.includes("classement_")
  );

  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  return (
    <ul>
      {segments.map(([, v], i) => (
        <li key={v}>
          {medals[i + 1] || (
            <span css="width: 1rem; display: inline-block"></span>
          )}
          {v}
        </li>
      ))}
    </ul>
  );
};
