// Action creators for building a burger
import axios from '../../api/axios-order';

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
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://burguer-builder-94096.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
