// ----------------------------------------------------------------------------
//                      BUILD BURGER
// ----------------------------------------------------------------------------

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// ----------------------------------------------------------------------------
//                      PURCHASE PROCESS
// ----------------------------------------------------------------------------

// Dispatch an action when we start the proccess (to manage UI)
// And then process steps
export const PURCHASE_INIT = 'PURCHASE_INIT'; // Whenever we load checkout page
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';

// ----------------------------------------------------------------------------
//                      GET ORDERS HISTORY
// ----------------------------------------------------------------------------

// Actions for listing orders. Same pattern as purchasing.
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

// ----------------------------------------------------------------------------
//                      AUTHENTICATION
// ----------------------------------------------------------------------------

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
