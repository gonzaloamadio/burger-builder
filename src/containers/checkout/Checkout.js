import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// We want to have a summary of what the user is about to buy.
// Button to cancel and go back, and another to continue.
// When the user continue, we want to load the contact form.
class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
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
          // We de NOT need this anymore, as we know we will have the data from redux
          // render={props => (
          //   <ContactData
          //     ingredients={this.props.ingredients}
          //     price={this.props.totalPrice}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToprops)(Checkout);
