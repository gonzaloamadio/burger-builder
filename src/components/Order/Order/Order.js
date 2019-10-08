import React from 'react';
import classes from './Order.module.css';

const order = props => {
  // We have this logic in Burger.js, and here we implement it
  // another way, just to see a different one.
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        {/* ParseFloat, convert string to number */}
        {/* Price <strong>AR: {Number.ParseFloat(props.price.toFixed(2))}</strong> */}
        Price <strong>AR: {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
