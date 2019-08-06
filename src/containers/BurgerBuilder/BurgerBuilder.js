import React from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
            salad: 1,
            meat : 2,
            cheese: 2,
            bacon : 0
        },
        totalPrice : 0
    }

    // Handler passed down to the controls, that add an ingredient.
    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngredients[type] + 1
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({totalPrice:newTotalPrice, ingredients:updatedIngredients})
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disableInfo}
                />
            </React.Fragment>
        );
    }
}

