import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button
            // Should receive type in props. Same name as in the CSS Button.module.css
            className={[classes.Button, classes[props.btnType]].join(" ")}
            onClick={props.clicked}        
        >
        {props.children}    
        </button>
    )
}

export default Button
