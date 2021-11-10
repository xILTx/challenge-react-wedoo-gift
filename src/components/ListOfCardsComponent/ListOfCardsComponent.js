import React from "react";
import { Card } from "../CardComponent/CardComponent";
import { useTrail, animated } from "react-spring";

import "./ListOfCardsComponent.css";
import { animateFromRight } from "../../animations/spring_from_right_opacity";

export const ListofCards = ({ ...props }) => {
  const trail = useTrail(props.cards.length, animateFromRight);

  return (
    <div className={"listOfCards-container"}>
      {trail.map(({ height, ...style }, index) => (
        <animated.div style={style} key={index}>
          <Card>{props.cards[index]} €</Card>
        </animated.div>
      ))}
    </div>
  );
};
