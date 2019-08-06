import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

// Component that will contain one or more BuildControl.

const controls = [
    {label: "Salad", type: "salad" },
    {label: "Bacon", type: "bacon" },
    {label: "Cheese", type: "cheese" },
    {label: "Meat", type: "meat" },
]

const BuildControls = props => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                add={() => props.addIngredient(ctrl.type)}
                remove={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]} // Boolean value
            />   
        ))}
    </div>
)


export default BuildControls