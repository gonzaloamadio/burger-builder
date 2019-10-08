import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationsItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      BurguerBuilder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationsItems;
