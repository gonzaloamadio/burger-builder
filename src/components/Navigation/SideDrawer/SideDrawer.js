import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationsItems'
import classes from './SideDrawer.module.css'

// Component for Side Menu. Will display in small devices.
// Animation, and styles in css module.
// Reuse navigation elements.

const SideDrawer = (props) => {

    return (
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default SideDrawer
