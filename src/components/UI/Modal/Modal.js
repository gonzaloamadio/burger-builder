import React from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {
    return (
        <div 
            className={classes.Modal}
            // translateY(0) : position defined in css
            // To hide, we translate -100 units of viewport height. So we slide it outside
            // Make is transparent (not visible) or not as well.
            style={{
                transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0' 
            }}
        >
           {props.children} 
        </div>
    )
}

export default Modal
