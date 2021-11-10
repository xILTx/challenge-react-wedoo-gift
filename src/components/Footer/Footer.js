import React from "react";
import { ReactComponent as SVGWaveGreyY } from "./../../assets/wave_grey_inverted_X.svg";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className={"footer-container"}>
      <SVGWaveGreyY className={"footer"} />
      <span className={"footer-text"}>
        Website created by passion and fuelled by curiosity, Marvin LAUBIES ©
        2021
      </span>
    </div>
  );
};
