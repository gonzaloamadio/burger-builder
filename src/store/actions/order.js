// Action creators for submitting an order
import * as actionTypes from './actionTypes';

// ---------------------------------------------------------------------------
// ---------------------- PURCHASE PROCESS -----------------------------------
// ---------------------------------------------------------------------------

// Expect id of newly created burger, the one created in the DB.
// So we can store in our orders array
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// Dispatch this action once we click the ORDER button
export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER, // Call a saga
    orderData,
    token
  };
};

// Set a flag that we are purchasing. When we are not purchasing anymore,
// we redirect to somewhere
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

// ---------------------------------------------------------------------------
// ---------------------- SHOW ORDERS ----------------------------------------
// ---------------------------------------------------------------------------

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS, // Call a saga
    token,
    userId
  };
};
