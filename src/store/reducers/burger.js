import * as actionTypes from '../actions';

const initialState = {
  // Temporari initial state. Then should be initialized from DB.
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2,
  cheese: 1.5,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // Special ES6 syntax to overwrite a property in a given object.
          // [NAME_U_WANT_TO_USE_AS_PROPERTY] : NEW_VALUE
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
