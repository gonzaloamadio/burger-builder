import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationsItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      BurguerBuilder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Log Out</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    )}
  </ul>
);

export default NavigationsItems;
