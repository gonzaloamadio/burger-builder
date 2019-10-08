import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        {' '}
        {/* Toolbar and render childrens  */}
        <BurgerBuilder /> {/*  Pages  */}
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
