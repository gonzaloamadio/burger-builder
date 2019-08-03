import React from 'react';
// import PropTypes from 'prop-types';
import Burger from '../../components/Burger/Burger'

// const propTypes = {};
// const defaultProps = {};


export default class BurgerBuilder extends React.Component {
    // The ingredients object keys, should match with the ones in BurguerIngredient.
    state = {
        ingredients : {
            salad: 1,
            meat : 2,
            cheese: 2
        }
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Burger Controls</div>
            </React.Fragment>
        );
    }
}

//  BurguerBuilder.propTypes = propTypes;
//  BurguerBuilder.defaultProps = defaultProps;