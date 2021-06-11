export default ({ data }) => {
  const segments = Object.entries(data).filter(([key]) =>
    key.includes("classement_")
  );
  return (
    <ul>
      {segments.map(([, v]) => (
        <li key={v}>{v}</li>
      ))}
    </ul>
  );
};
