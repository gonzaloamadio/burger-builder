import React from 'react'

// This Component shows a summary of the order. 
// Will be shown in the model before checking out.

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>
                    ) 
        })


    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A burguer with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
        </React.Fragment>
    )
}

export default OrderSummary
