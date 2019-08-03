import React from 'react'
// import PropTypes from 'prop-types'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const Burger = props => {

    // With first map, create an empty array of size: ingredients[igKey]
    // With second map, inside each space of each array, create an ingredient with correct type.
    // Return: array of arrays with ingredients.
    // With reduce, we transform it in one array, easier to make checks.
    // console.log(ingredientsArr) // [salad0,cheese0,cheese1]
    let ingredientsArr = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })  // Flatten array, to see if there is zero elems.
        .reduce((arr,el) => {
            return arr.concat(el);
        }, []);

    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please start adding ingredients.</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArr}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

// Burger.propTypes = {
// }

export default Burger
