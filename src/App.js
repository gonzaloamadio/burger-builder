import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          {/* exact is not neccessary but we leave it. */}
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        {/* <Route path="" component={} /> */}
      </Layout>
    </div>
  );
}

export default App;
