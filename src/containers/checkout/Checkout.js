import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

// We want to have a summary of what the user is about to buy.
// Button to cancel and go back, and another to continue.
// When the user continue, we want to load the contact form.
export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1
    }
  };

  // We use DidMount because when we load the component, it is mounted.
  // It is not nested somewhere, se it is mounted again by the router when
  // we load it.
  componentDidMount() {
    // Includes the ?
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '2']
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
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
        {/* Ingredients are coming from ? --> Routing!, for now, dummy */}
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
      </div>
    );
  }
}
