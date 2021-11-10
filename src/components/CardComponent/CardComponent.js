import React from "react";
import { ReactComponent as SVGCard } from "./../../assets/modified_svg_gift_card.svg";

import "./CardComponent.css";

export const Card = ({ ...props }) => {
  return (
    <a href="https://www.wedoogift.com/carte-cadeau/">
      <div className={"card-container"}>
        <SVGCard className={"card"} />
        <span className={"card-amount"}>{props.children}</span>
      </div>
    </a>
  );
};
