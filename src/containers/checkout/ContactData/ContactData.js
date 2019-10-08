import React, { Component } from 'react';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../api/axios-order';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    // Prevent to send a request (default of a form)
    event.preventDefault();

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // This should be calculated in server to avoid manipulation.
      customer: {
        name: 'Gonzalo',
        email: 'gon@zalo.com',
        address: {
          street: 'Brown',
          number: '1326',
          zipCode: '2500',
          country: 'Argentina'
        }
      },
      deliveryMethod: 'fastest'
    };
    // At this instance, we send the info to a DB.
    // Then we should add a checkout page, and do it better.
    // We need to add .json, cause of firebase.
    axios
      .post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}
