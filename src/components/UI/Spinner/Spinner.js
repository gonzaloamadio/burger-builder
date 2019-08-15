import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => (
    // Loading... is a fall back if css is not displayed.
    <div className={classes.Loader}>Loading...</div>
)

export default Spinner
