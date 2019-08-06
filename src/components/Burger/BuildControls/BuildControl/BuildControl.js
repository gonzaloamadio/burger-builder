import React from 'react'
import classes from './BuildControl.module.css'

// Component that will layout a Builder Control.
// A text, and two buttons to add or take out an ingredient.
// Text will be an ingredient, so same as in BurguerIngredient.

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.More}
            onClick={props.add}
        >+</button>
        <button 
            className={classes.Less}
            onClick={props.remove}
            disabled={props.disabled}
        >-</button>
    </div>
)

export default BuildControl
