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
        value: '',
        validation: {
          required: true
        },
        valid: false
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
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
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

    // We need to extract the values, that we have in our state. In value field.
    const formData = {};
    for (let key in this.state.orderForm) {
      // Transform to: {email: '<email_form_value>', . . . }
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // This should be calculated in server to avoid manipulation.
      orderData: formData
    };
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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValida;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValida;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValida;
    }

    return isValid;
  }

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
    // Check validity, pass value and rules.
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement.valid);
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
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
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
