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
        // Initialize ingredients from DB.
        // If we pass ingredients to another component, we should first check if they exist.
        // Down in this file, se can see: if (this.state.ingredients) 
        // before passing ingredients to OrderSummary for example.
        axios.get('https://burguer-builder-94096.firebaseio.com/ingredients.json')
        .then(response => {
            // This will load async. So if we have part of the UI that depends on
            // this data, we should check if this exists before rendering them.
            // If not, show spinner or whatever.
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

        // As this is part of the routable area of the project
        // we have access to routers props: history, match.
        // Only this one, that it is loaded through a Route 
        // component has the access. Nested components, for example
        // burger, that is loaded in the render of this component,
        // has no access to them. We have to pass them manually or 
        // with the withRouter HOC provided by react-router-dom.

        const queryParams = []
        for (let i in this.state.ingredients) {
            // Encode element so they can be used in a URL.
            // Relevant for example for whitespaces, and so on.
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        // THIS IS COMPLETELY WRONG, ONLY FOR TESTING PURPOSE
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
        // We should check this, because we are initializing from DB, we fetch them.
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