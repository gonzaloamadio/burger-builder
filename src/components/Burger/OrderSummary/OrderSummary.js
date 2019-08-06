import React from 'react'
import Button from '../../UI/Button/Button'

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
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkout}>ORDER</Button>
        </React.Fragment>
    )
}

export default OrderSummary
