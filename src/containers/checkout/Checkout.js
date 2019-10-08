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
  render() {
    return (
      <div>
        {/* Ingredients are coming from ? --> Routing!, for now, dummy */}
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
