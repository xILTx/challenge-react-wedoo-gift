import Joi from "joi";

const possibleCombinations = [
  { value: 20, cards: [20] },
  { value: 22, cards: [22] },
  { value: 25, cards: [25] },
  { value: 26, cards: [26] },
  { value: 35, cards: [35] },
  { value: 40, cards: [20, 20] },
  { value: 42, cards: [22, 20] },
  { value: 45, cards: [45] },
  { value: 51, cards: [26, 25] },
  { value: 55, cards: [35, 20] },
  { value: 57, cards: [35, 22] },
  { value: 70, cards: [35, 35] },
  { value: 100, cards: [25, 25, 25, 25] },
];

const getCombinaison = (desiredAmount) => {
  desiredAmount = +desiredAmount;

  var lowerIndex;
  var equalIndex;
  var upperIndex;
  possibleCombinations.forEach((combination, index) => {
    if (combination.value <= desiredAmount) {
      lowerIndex = index;
    }
    if (combination.value >= desiredAmount && upperIndex === undefined) {
      upperIndex = index;
    }
    if (combination.value === desiredAmount) {
      equalIndex = index;
    }
  });

  return {
    equal:
      equalIndex !== undefined ? possibleCombinations[equalIndex] : undefined,
    floor:
      lowerIndex !== undefined ? possibleCombinations[lowerIndex] : undefined,
    ceil:
      upperIndex !== undefined ? possibleCombinations[upperIndex] : undefined,
  };
};

export async function fetchCombinaisonOfCards(desiredAmount) {
  try {
    Joi.assert(desiredAmount, Joi.number().min(0).max(999).required());
    const message = getCombinaison(desiredAmount);
    return [null, message];
  } catch (err) {
    return [err];
  }
}
