import React from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../api/axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

// Statefull component where we will manage logic about building the burguer.

const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 2,
    cheese : 1.5,
    bacon : 0.7
}

class BurgerBuilder extends React.Component {
    // The ingredients object keys, should match with the ones in BurguerIngredient.
    state = {
        ingredients : null,
        totalPrice : 0,
        purchasable: false, // Dis/Enable checkout button
        purchasing: false,  // Are we checking out? Button clicked
        loading : false,
        error : false
    }

    componentDidMount () {
        axios.get('https://burguer-builder-94096.firebaseio.com/ingredients.json')
        .then(response => {
            // This will load async. So if we have part of the UI that depends on
            // this data, we should check if this exists before rendering them.
            this.setState({ingredients : response.data})
        })
        .catch(err => {
            this.setState({error:true})
        })
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
    purchaseCheckoutHandler = () => {
        // alert('Burguer bought.')

        this.setState({loading: true})

        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice, // This should be calculated in server to avoid manipulation.
            customer : {
                name : 'Gonzalo',
                email: 'gon@zalo.com',
                address : {
                    street : 'Brown',
                    number : '1326',
                    zipCode : '2500',
                    country : 'Argentina'
                }
            },
            deliveryMethod : 'fastest'
        }
        // At this instance, we send the info to a DB.
        // Then we should add a checkout page, and do it better.
        // We need to add .json, cause of firebase.
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({loading : false , purchasing : false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false , purchasing : false})

            })
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

        // Is http beeing sent?                

        // Are ingredients loaded? Set components that use them.
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can not be retrieved.</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                <Burger ingredients={this.state.ingredients}/> ,
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    purchasing={this.purchaseHandler} // Use to show modal, change state
                />
                </React.Fragment>
            )

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                cancelled={this.purchaseCancelHandler}
                checkout={this.purchaseCheckoutHandler}
                totalPrice={this.state.totalPrice}/>
        }

        if (this.state.loading) { orderSummary = <Spinner />}


        return (
            <React.Fragment>
                {/* To show modal, we use css animation, and the prop passed to modal. */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios)