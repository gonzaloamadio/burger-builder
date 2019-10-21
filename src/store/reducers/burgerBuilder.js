import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  // Temporari initial state. Then should be initialized from DB.
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false // Si estamos construyendo alguna hamburguesa o no
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2,
  cheese: 1.5,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  // Special ES6 syntax to overwrite a property in a given object.
  // [NAME_U_WANT_TO_USE_AS_PROPERTY] : NEW_VALUE
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedPrice =
    state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: updatedPrice,
    building: true
  });
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: initialState['totalPrice'],
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true
      });
    default:
      return state;
  }
};

export default reducer;
