// Action creators for submitting an order

import axios from '../../api/axios-order';
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
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
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
  return dispatch => {
    dispatch(fetchOrdersStart());
    // query params understood by firebase.
    // orderBy="userId"&equalTo=  --> Sort and also filter
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('./orders.json' + queryParams)
      .then(res => {
        // We receive a javascript Object. Json { firebase_id : {Order Data} }
        console.log('Mis ordenes', res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        // this.setState({ loading: false, orders: fetchedOrders });
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
