import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return updateObject(state, {
    // Store orders in my orders, and set loading to false.
    loading: false,
    orders: state.orders.concat(newOrder), // TODO: Clean, we are not using it
    purchased: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {
        purchased: false
      });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true
      });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false
      });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {
        loading: false
      });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, {
        loading: false
      });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.orders
      });
    default:
      return state;
  }
};

export default reducer;
