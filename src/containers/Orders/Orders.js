import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order/Order";
import axios from "../../api/axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

// We want to display my orders in this page.
// We will create an Order component, that displays the information of an order.
// We will fetch the orders from the backend, and display all of them.
const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
    // eslint-disable-next-line
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

// DESPITE we are using axions inside the actions, this still works.
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
