import React from 'react';
import classes from './Input.module.css';

// We create a dynamic element. Can be an input,
const input = props => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      // Generate element with the inputType, and then, you
      // can pass any HTML attribute to the element generator,
      // and they will pass down through ...props.
      // CAREFUL: html attributes should corresponde to the html element type.
      inputElement = <input className={classes.InputElement} {...props} />;
      break;
    case 'textArea':
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
