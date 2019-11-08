// Action creators for building a burger
import * as actionTypes from './actionTypes';

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  };
};
export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  };
};

// --------- Initialize ingredients from DB ---------

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS, // Call a saga
    ingredients
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  };
};
