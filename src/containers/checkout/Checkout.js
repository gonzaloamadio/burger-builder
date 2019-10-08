import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// We want to have a summary of what the user is about to buy.
// Button to cancel and go back, and another to continue.
// When the user continue, we want to load the contact form.
export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  // Change for WillMount because:
  // We have access to the props before we render the childs
  // and we can already set the state. If not, we will try to
  // render ContactData with null props, and it will be an error.
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // param == ['salad', '2']

      // WORKAROUND for this. Later we will do it better
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients });
    this.setState({ totalPrice: price });
  }

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
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        {/* Depends on path we are + contact-data */}
        {/* Despite we overwrite the url, state is not modified, so component
         is not re rendered, and the summary stay the same. */}
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}
