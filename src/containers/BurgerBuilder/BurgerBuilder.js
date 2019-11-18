import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../api/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";

// Statefull component where we will manage logic about building the burguer.

const BurgerBuilder = props => {
  // The ingredients object keys, should match with the ones in BurguerIngredient.
  const [purchasing, setPurchasing] = useState(false); // Are we checking out? Button clicked
  // We will manage this two with redux now.
  // loading: false,
  // error: false

  // Takes a function, that takes the current state, and then return the portion of the state we want
  // We can return one big object instead of 4 selectors. But is cleaner this way and closer to mapStateToProps
  const ingredients = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();
  // This dispatch function, refers to what useDispatch returns
  const onIngredientAdded = ingredientName =>
    dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = ingredientName =>
    dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  // If there is at least one ingredient, we can proceed to checkout.
  const updatePurchasableState = updatedIngredients => {
    let total = 0;
    for (let k in updatedIngredients) {
      total += updatedIngredients[k];
    }
    return total > 0;
  };

  // Handler that manages proceed to checkout button click.
  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      // We store in redux the route to go after login in
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  // Handle Click in Backdrop
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  // From Seeing the order, to the real checkout.
  const purchaseCheckoutHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = {
    ...ingredients
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
  let burger = error ? <p>Ingredients can not be retrieved.</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ingredients} /> ,
        <BuildControls
          // This dispatch actions, take argument, but here are only passed down on,
          // So we have to check BuildControls to see if we are passing the required arguments.
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientRemoved}
          disabled={disableInfo}
          // We can manage the purchasable state in redux to, it is another option.
          purchasable={updatePurchasableState(ingredients)}
          price={totalPrice}
          purchasing={purchaseHandler} // Use to show modal, change state
          isAuth={isAuthenticated}
        />
      </React.Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        cancelled={purchaseCancelHandler}
        checkout={purchaseCheckoutHandler}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <React.Fragment>
      {/* To show modal, we use css animation, and the prop passed to modal. */}
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

// ------------------ REDUX -------------------------

// DESPITE we are using axions inside the actions, this still works.
export default withErrorHandler(BurgerBuilder, axios);
