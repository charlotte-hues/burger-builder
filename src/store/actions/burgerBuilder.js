import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredient
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredient
  };
};

const setIngredients = ingredients => {
  console.log(ingredients);
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

const fetchIngredientsFailed = error => {
  console.log(error);
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        return dispatch(setIngredients(response.data));
      })
      .catch(error => dispatch(fetchIngredientsFailed(error)));
  };
};
