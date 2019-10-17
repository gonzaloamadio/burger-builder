import React from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../api/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as reduxActions from '../../store/actions';

// Statefull component where we will manage logic about building the burguer.

class BurgerBuilder extends React.Component {
  // The ingredients object keys, should match with the ones in BurguerIngredient.
  state = {
    purchasable: false, // Dis/Enable checkout button
    purchasing: false // Are we checking out? Button clicked
    // We will manage this two with redux now.
    // loading: false,
    // error: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // If there is at least one ingredient, we can proceed to checkout.
  updatePurchasableState = updatedIngredients => {
    let total = 0;
    for (let k in updatedIngredients) {
      total += updatedIngredients[k];
    }
    return total > 0;
  };

  // Handler that manages proceed to checkout button click.
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  // Handle Click in Backdrop
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // From Seeing the order, to the real checkout.
  purchaseCheckoutHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {
      ...this.props.ingredients
    };
    // turns object values intro true or false, so we can know which
    // remove ingredient button should be disabled.
    // {salad:true, cheese:false,  ....}
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    // Is http beeing sent?

    // Are ingredients loaded? Set components that use them.
    // We should check this, because we are initializing from DB, we fetch them.
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can not be retrieved.</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} /> ,
          <BuildControls
            // This dispatch actions, take argument, but here are only passed down on,
            // So we have to check BuildControls to see if we are passing the required arguments.
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disableInfo}
            // We can manage the purchasable state in redux to, it is another option.
            purchasable={this.updatePurchasableState(this.props.ingredients)}
            price={this.props.totalPrice}
            purchasing={this.purchaseHandler} // Use to show modal, change state
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelled={this.purchaseCancelHandler}
          checkout={this.purchaseCheckoutHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <React.Fragment>
        {/* To show modal, we use css animation, and the prop passed to modal. */}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(reduxActions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(reduxActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(reduxActions.initIngredients())
  };
};

// DESPITE we are using axions inside the actions, this still works.
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
