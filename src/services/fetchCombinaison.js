import axios from "axios";
import Joi from "joi";

const apis = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_ACCESS_TOKEN },
});

export async function fetchCombinaisonOfCards(desiredAmount) {
  try {
    Joi.assert(desiredAmount, Joi.number().min(0).max(999).required());
    const message = await apis.get("/shop/5/search-combination", {
      params: {
        amount: desiredAmount,
      },
    });
    return [null, message.data];
  } catch (err) {
    return [err];
  }
}
