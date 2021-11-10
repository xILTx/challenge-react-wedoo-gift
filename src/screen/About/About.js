import React from "react";
import { ReactComponent as SVGWaveGreyY } from "./../../assets/wave_grey_inverted_X.svg";
import { ReactComponent as SVGArrow } from "./../../assets/arrow-right.svg";
import mailLogo from "./../../assets/logos/mail-icon.png";
import phoneLogo from "./../../assets/logos/phone-icon.png";
import linkedinLogo from "./../../assets/logos/linkedin-icon.png";
import githubLogo from "./../../assets/logos/github-icon.png";
import { useSpring, animated } from "react-spring";

import "./About.css";

export const About = ({ ...props }) => {
  const animateAboutScreen = useSpring({
    config: { mass: 5, tension: 1300, friction: 300 },
    to: { y: props.toggle ? "0%" : "100%" },
    from: { y: "100%" },
  });

  return (
    <animated.div className={"about-body"} style={animateAboutScreen}>
      <SVGWaveGreyY className={"about-header"} />
      <div className={"about-content"}>
        <div onClick={props.onClick}>
          <SVGArrow className={"arrow"} width={"20px"} />
        </div>
        <h1 className={"h1 margin-neg"}>A quoi sert cet outil ?</h1>
        <p className={"p"}>
          cet outil permet de vérifier si le montant de la carte cadeau que vous
          désirez est disponible dans nos stocks.
        </p>
        <h1 className={"h1"}>Comment fonctionne t'il ?</h1>
        <p className={"p"}>
          - Si le montant cadeau désiré est disponible, l'outil affichera alors
          la/les cartes permettant d'obtenir ce montant. <br />
          - Si le montant cadeau désiré n'est pas disponible, mais que d'autres
          montants alternatifs existent, l'outil vous les proposera
          <br />- Enfin si le montant est plus haut ou plus bas que les montants
          disponibles, l'outil corrige automatiquement à la valeur la plus
          proche
        </p>
        <br />
        <h1 className={"h1"}>Created by</h1>
        <h2 className={"h2"}>Marvin Laubies</h2>
        <ul className={"about-me-list"}>
          <li className={"li"}>
            <a className={"a"} href={"mailto:marvin.laubies@outlook.fr"}>
              <img src={mailLogo} alt="MailLogo" width="20" />
              <span className={"list-text"}>marvin.laubies@outlook.fr</span>
            </a>
          </li>
          <li className={"li"}>
            <img src={phoneLogo} alt="PhoneLogo" width="20" />
            <span className={"list-text"}>+33 6 75 36 08 72</span>
          </li>
          <li className={"li"}>
            <a
              className={"a"}
              href={"https://www.linkedin.com/in/marvin-laubies/"}
            >
              <img src={linkedinLogo} alt="LinkedInLogo" width="20" />
              <span className={"list-text"}> /marvin-laubies </span>
            </a>
          </li>
          <hr width={"100%"} />
          <li className={"li"}>
            <a
              className={"a"}
              href="https://github.com/xILTx/challenge-react-wedoo-gift"
            >
              <img src={githubLogo} alt="GithubLogo" width="20" />
              <span className={"list-text"}> Github du projet </span>
            </a>
          </li>
        </ul>
      </div>
    </animated.div>
  );
};
