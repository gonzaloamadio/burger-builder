import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

// We want to have a summary of what the user is about to buy.
// Button to cancel and go back, and another to continue.
// When the user continue, we want to load the contact form.
const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  // If there are no ingredients, Redirect (for example if we enter checkout directly)
  let summary = <Redirect to="/" />;
  // Redirect if we have finished purchasing (submit order form)
  if (props.ingredients) {
    const purchased = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchased}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler}
        />
        {/* Depends on path we are + contact-data */}
        {/* Despite we overwrite the url, state is not modified, so component
         is not re rendered, and the summary stay the same. */}
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToprops)(Checkout);
