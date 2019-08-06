import React from 'react'
import classes from './Backdrop.module.css'

// Will be seen as a shadow, that when clicked will do an action.
// Usually close a modal.

const Backdrop = (props) => (
    props.show ?
        <div 
            className={classes.Backdrop}
            onClick={props.clicked}
        ></div>
    : null
)

export default Backdrop
