import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationsItems = (props) => (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>BurguerBuilder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )

export default NavigationsItems
