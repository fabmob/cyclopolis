import { useRef } from "react";
import correspondanceGéographique from "../correspondanceGéographique.csv";
import geoData from "../geoData";

export default ({ ville, codeDepartement, codeRegion }) => {
  const { région, département } =
      codeDepartement && codeRegion
        ? { région: codeRegion, département: codeDepartement }
        : correspondanceGéographique.find((c) => c.ville === ville),
    d = geoData
      .find((r) => r.codeInsee === région + "")
      .departements.find((d) => d.numeroDepartement === "" + département).d;

  const pathRef = useRef(null);

  var values = d
    .split("L")
    .join(" ")
    .split("M")
    .join(" ")
    .split("z")
    .join("")
    .split(" ");

  return (
    <div
      css={`
        path {
          stroke: #000000;
          stroke-width: 1px;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-opacity: 0.25;
          fill: #86aae0;
        }
        g:hover path {
          fill: #86cce0;
        }
        g path:hover {
          fill: #86eee0;
        }

        path.exists {
          fill: #86eee0;
        }
      `}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="3rem"
        viewBox={viewBox(pathRef.current && pathRef.current.getBBox())}
        xmlSpace="preserve"
      >
        <path d={d} ref={pathRef}></path>
      </svg>
    </div>
  );
};

const viewBox = (clientrect) =>
  clientrect &&
  clientrect.x +
    " " +
    clientrect.y +
    " " +
    clientrect.width +
    " " +
    clientrect.height;
