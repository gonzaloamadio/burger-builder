import React from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

// Statefull component where we will manage logic about building the burguer.

const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 2,
    cheese : 1.5,
    bacon : 0.7
}

export default class BurgerBuilder extends React.Component {
    // The ingredients object keys, should match with the ones in BurguerIngredient.
    state = {
        ingredients : {
            salad: 0,
            meat : 0,
            cheese: 0,
            bacon : 0
        },
        totalPrice : 0,
        purchasable: false, // Dis/Enable checkout button
        purchasing: false,  // Are we checking out? Button clicked
    }

    // If there is at least one ingredient, we can proceed to checkout.
    // With this state, control if proceed button is disabled or not.
    updatePurchasableState = updatedIngredients => {
        let total = 0
        for (let k in updatedIngredients){
            total += updatedIngredients[k]
        }
        this.setState({purchasable: total > 0})
    }

    // Handler that manages proceed to checkout button click.
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    // Handle Click in Backdrop
    purchaseCancelHandler = ()  => {
        this.setState({purchasing: false})
    }

    // From Seeing the order, to the real checkout.
    checkoutHandler = () => {
        alert('Burguer bought.')
    }

    // Handler passed down to the controls, that add an ingredient.
    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngredients[type] + 1
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({totalPrice:newTotalPrice, ingredients:updatedIngredients})
        // As React bundles this 2 setState methods, we need to pass ingredients
        // as argument, if not it will make calculations with the old state.
        this.updatePurchasableState(updatedIngredients)
    }

    // Handler passed down to the controls, that removes an ingredient.
    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        if (updatedIngredients[type] > 0){
            updatedIngredients[type] = updatedIngredients[type] - 1 
            const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
            this.setState({totalPrice:newTotalPrice, ingredients:updatedIngredients})
        }
        this.updatePurchasableState(updatedIngredients)
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        // turns object values intro true or false, so we can know which 
        // remove ingredient button should be disabled.
        // {salad:true, cheese:false,  ....}
        for (let key in  disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        return (
            <React.Fragment>
                {/* To show modal, we use css animation, and the prop passed to modal. */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelled={this.purchaseCancelHandler}
                        checkout={this.checkoutHandler}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    purchasing={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

