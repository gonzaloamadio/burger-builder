import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

// We want to have a summary of what the user is about to buy.
// Button to cancel and go back, and another to continue.
// When the user continue, we want to load the contact form.
class Checkout extends Component {
  componentDidMount() {
    // Set a flag that we are purchasing. When we are not purchasing anymore,
    // we redirect to somewhere
    this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    // If there are no ingredients, Redirect (for example if we enter checkout directly)
    let summary = <Redirect to="/" />;
    // Redirect if we have finished purchasing (submit order form)
    if (this.props.ingredients) {
      const purchased = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchased}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}
          />
          {/* Depends on path we are + contact-data */}
          {/* Despite we overwrite the url, state is not modified, so component
         is not re rendered, and the summary stay the same. */}
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit)
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Checkout);
