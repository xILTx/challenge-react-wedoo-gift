import React, { useEffect, useState } from "react";
import { ListofCards } from "../../components/ListOfCardsComponent/ListOfCardsComponent";
import { fetchCombinaisonOfCards } from "../../services/fetchCombinaison";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import WaitImage from "../../assets/offre-cheques-cadeaux.png";
import ChooseImage from "../../assets/personne-etage.png";
import { useSpring, useSpringRef, useChain, animated } from "react-spring";

import "./CardFinder.css";
import { About } from "../About/About";

export const CardFinder = () => {
  const [desiredAmount, setDesiredAmount] = useState("");
  const [togglePlusMinusCards, setTogglePlusMinusCards] = useState(false);
  const [combinaisonOfCards, setCombinaisonOfCards] = useState({});
  const [cardsToDisplay, setCardsToDisplay] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [toggleAboutScreen, setToggleAboutScreen] = useState(false);

  const springRef = useSpringRef();
  const animateButton = useSpring({
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: togglePlusMinusCards ? 1 : 0,
    y: togglePlusMinusCards ? 0 : 40,
    from: { opacity: 0, y: 40 },
    ref: springRef,
  });

  const transitionRef = useSpringRef();
  const animateResults = useSpring({
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: togglePlusMinusCards ? 1 : isFirstTime ? 1 : 0,
    y: togglePlusMinusCards ? 0 : isFirstTime ? 0 : 40,
    from: { opacity: 0, y: 40 },
    ref: transitionRef,
  });

  useChain([springRef, transitionRef], [0, 0.15]);

  useEffect(() => {
    if (combinaisonOfCards.equal !== undefined) {
      setTogglePlusMinusCards(false);
      setCardsToDisplay(combinaisonOfCards.equal.cards);
    } else if (
      combinaisonOfCards.floor !== undefined &&
      combinaisonOfCards.ceil !== undefined
    ) {
      setCardsToDisplay([]);
      setTogglePlusMinusCards(true);
    } else if (combinaisonOfCards.floor !== undefined) {
      setDesiredAmount(combinaisonOfCards.floor.value);
      setCardsToDisplay(combinaisonOfCards.floor.cards);
      setTogglePlusMinusCards(false);
    } else if (combinaisonOfCards.ceil !== undefined) {
      setDesiredAmount(combinaisonOfCards.ceil.value);
      setCardsToDisplay(combinaisonOfCards.ceil.cards);
      setTogglePlusMinusCards(false);
    }
  }, [combinaisonOfCards]);

  const handleOnChange = (value) => {
    if (inputError) {
      setInputError(false);
    }
    if (value.target.value < 0) {
      setDesiredAmount(0);
    } else {
      setDesiredAmount(value.target.value);
    }
  };

  const handleOnValidateClick = async () => {
    if (isFirstTime) {
      setIsFirstTime(false);
    }
    console.log("desiredAmount :", desiredAmount);
    const res = await fetchCombinaisonOfCards(desiredAmount);
    if (res[0] === null) {
      console.log(res[1]);
      setCombinaisonOfCards(res[1]);
      setDesiredAmount(desiredAmount);
    } else {
      setInputError(true);
    }
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      handleOnValidateClick();
    }
  };

  const handleOnPriceClick = (e) => {
    if (e.target.id === "floor") {
      setDesiredAmount(combinaisonOfCards.floor.value);
      setCardsToDisplay(combinaisonOfCards.floor.cards);
    } else if (e.target.id === "ceil") {
      setDesiredAmount(combinaisonOfCards.ceil.value);
      setCardsToDisplay(combinaisonOfCards.ceil.cards);
    }
    setTogglePlusMinusCards(false);
  };

  const handleOnAboutClick = () => {
    setToggleAboutScreen(!toggleAboutScreen);
  };

  return (
    <div className="body">
      <Header onClick={handleOnAboutClick} />
      <About onClick={handleOnAboutClick} toggle={toggleAboutScreen} />
      <div className={"container"}>
        {togglePlusMinusCards ? (
          <animated.button
            className={"button-choice"}
            id={"floor"}
            onClick={handleOnPriceClick}
            style={animateButton}
          >
            {combinaisonOfCards.floor.value} €
          </animated.button>
        ) : null}
        <div className={"input-container"}>
          <div className={inputError ? "input-error-shake" : null}>
            <input
              className={
                "input-amount " + (inputError ? "input-error-shadow" : null)
              }
              type="number"
              value={desiredAmount}
              onChange={handleOnChange}
              onKeyPress={handlePressEnter}
              min="0"
              max="999"
              onWheel={(e) => e.target.blur()}
              placeholder={"0"}
            />
            <span className={"input-currency"}>€</span>
          </div>
          <button
            className={"button-global validate-button"}
            onClick={handleOnValidateClick}
          >
            VALIDER
          </button>
        </div>
        {togglePlusMinusCards ? (
          <animated.button
            className={"button-choice"}
            id={"ceil"}
            onClick={handleOnPriceClick}
            style={animateButton}
          >
            {combinaisonOfCards.ceil.value} €
          </animated.button>
        ) : null}
      </div>
      {cardsToDisplay.length ? (
        <div className={"result-container"}>
          <span className={"result-text"}>
            {!togglePlusMinusCards
              ? "Votre montant est composé des cartes suivantes :"
              : null}
          </span>
          <ListofCards cards={cardsToDisplay} />
        </div>
      ) : (
        <animated.div className={"result-container"} style={animateResults}>
          <span className={"result-text"}>
            {isFirstTime
              ? "Veuillez entrer un montant afin de vérifier si votre carte cadeau est disponible"
              : "Désolé ce montant n'est pas disponible ! veuillez choisir un montant proposé."}
          </span>
          {isFirstTime ? (
            <img src={WaitImage} alt={"WaitImage"} className={"image"} />
          ) : (
            <img src={ChooseImage} alt={"ChooseImage"} className={"image"} />
          )}
        </animated.div>
      )}
      <Footer />
    </div>
  );
};
