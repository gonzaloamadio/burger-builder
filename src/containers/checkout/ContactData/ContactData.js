import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../api/axios-order";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as reduxActions from "../../../store/actions";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      // Name of elementType, elementConfig props, are up to us.
      // Here we use normal HTML element types, without < >
      elementType: "input",
      // Define config, the normal attributes we can set up for the chosen html tag.
      // Inside elementConfig, there must be HTML tags, because we spread them in Input.js
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false // flag to see if the element was in focus (so it does not start in red (invalid))
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Postal Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      valid: true,
      validation: {}
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    // Prevent to send a request (default of a form)
    event.preventDefault();

    // We need to extract the values, that we have in our state. In value field.
    const formData = {};
    for (let key in orderForm) {
      // Transform to: {email: '<email_form_value>', . . . }
      formData[key] = orderForm[key].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };

    // Post order, and store in local redux state
    props.onOrderBurger(order, props.token);
  };

  // This method is attached to an event listener (input element).
  // So we will receive an event.
  // inputChangeHandler = (event) => {
  // Also we need two way binding to update the input, so we need to know
  // which element are we in. So we add the inputIdentifier param (the name does not matter)
  // and also we need to adjust how we pass this handler to the <Input> to an arrow function
  const inputChangeHandler = (event, inputIdentifier) => {
    // Inmutably update the relevant element.
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      // Check validity, pass value and rules.
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });
    // Inmutably update the relevant element in the state.
    const orderFormUpdated = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let key in orderFormUpdated) {
      // We should have this valid property in all elements, if not will be undefined.
      formIsValid = orderFormUpdated[key].valid && formIsValid;
    }

    setOrderForm(orderFormUpdated);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key, // name
      config: orderForm[key] // {elementType: 'input', elementConfig ... }
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangeHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(reduxActions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
