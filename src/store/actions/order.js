// Action creators for submitting an order

import axios from '../../api/axios-order';
import * as actionTypes from './actionTypes';

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

// Dispatch this action once we click the ORDER button
export const purchaseBurgerStart = orderData => {
  return dispatch => {
    axios
      .post('/orders.json', orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
