import React from 'react'
import classes from './Logo.module.css'
// make webpack aware that we are using this image.
// Then webpack will handle this image in its own special way.
// BurgerLogo will refer to a string, the path where webpack
// store the optimized and copied image.
import burgerLogo from '../../assets/images/burger-logo.png'


const logo = (props) => (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger"></img>
        </div>
    )

export default logo
