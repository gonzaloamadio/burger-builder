import React, { Component } from 'react';

import Order from '../../components/Order/Order/Order';
import axios from '../../api/axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// We want to display my orders in this page.
// We will create an Order component, that displays the information of an order.
// We will fetch the orders from the backend, and display all of them.
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('./orders.json')
      .then(res => {
        // We receive a javascript Object. Json
        // { firebase_id : {Order Data} }
        console.log('Mis ordenes', res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          // Create the object with the data and add key so we dont loose it.
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
