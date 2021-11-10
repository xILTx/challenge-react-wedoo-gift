import React from "react";
import { ReactComponent as SVGWave } from "./../../assets/wave.svg";
import { ReactComponent as SVGWaveGrey } from "./../../assets/wave_grey_inverted_X.svg";
import { ReactComponent as SVGLogo } from "./../../assets/we_doo_interview.svg";

import "./Header.css";

export const Header = ({ ...props }) => {
  return (
    <div>
      <SVGWave className={"header-background"} />
      <SVGWaveGrey className={"header-background-alt"} />
      <div className={"header-container"}>
        <SVGLogo className={"header-logo"} />
        <button className={"button-about"} onClick={props.onClick}>
          ABOUT
        </button>
      </div>
    </div>
  );
};
