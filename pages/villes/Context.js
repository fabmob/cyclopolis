import cyclopolisData from "../../cyclopolisData.csv";
import { rawToNumber } from "./[name]";
const Context = ({ value, metric }) => {
  console.log(cyclopolisData);
  const data = cyclopolisData.map((o) => rawToNumber(o[metric])),
    min = Math.min(...data),
    max = Math.max(...data);
  console.log(data, min, max, value);
  const position = ((max - min) / rawToNumber(value)) * 100;
  return (
    <div
      css={`
        width: 100%;
        height: 1rem;
        bottom: 0;
        position: absolute;

        background: linear-gradient(90deg, #0c7ee8 0%, #5fe49b 100%);
      `}
    >
      <span
        css={`
          position: absolute;
          left: ${position}%;
          bottom: -0.1rem;
        `}
      >
        📍
      </span>
    </div>
  );
};

export default Context;