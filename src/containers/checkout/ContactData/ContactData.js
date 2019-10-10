import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../api/axios-order';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        // Name of elementType, elementConfig props, are up to us.
        // Here we use normal HTML element types, without < >
        elementType: 'input',
        // Define config, the normal attributes we can set up for the chosen html tag.
        // Inside elementConfig, there must be HTML tags, because we spread them in Input.js
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
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
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  // This method is attached to an event listener (input element).
  // So we will receive an event.
  // inputChangeHandler = (event) => {
  // Also we need two way binding to update the input, so we need to know
  // which element are we in. So we add the inputIdentifier param (the name does not matter)
  // and also we need to adjust how we pass this handler to the <Input> to an arrow function
  inputChangeHandler = (event, inputIdentifier) => {
    const orderFormUpdated = {
      // If we do this only, it will not be a deep clone. I.e. the nested elements will be not cloned
      // but only the pointers, so if I change something there i will still mutate the original state.
      // Because the object in my copied object and the object in the state would still be equal.
      ...this.state.orderForm
    };
    // So we need to do this to. Clone again the second level, i.e. {OrderForm: {name: {THIS_ONE}, email:{THIS_ONE} }}
    const updatedFormElement = { ...orderFormUpdated[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    orderFormUpdated[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: orderFormUpdated });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key, // name
        config: this.state.orderForm[key] // {elementType: 'input', elementConfig ... }
      });
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
