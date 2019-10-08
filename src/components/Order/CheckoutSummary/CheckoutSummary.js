import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      {/* This div will set boundaries of burguer */}
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked>
          Cancel
        </Button>
        <Button btnType="Success" clicked>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
