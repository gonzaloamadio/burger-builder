import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

// import Checkout from './containers/checkout/Checkout';
const Checkout = React.lazy(() => import("./containers/checkout/Checkout"));
// import Orders from './containers/Orders/Orders';
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// import Auth from './containers/Auth/Auth';
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = props => {
  useEffect(() => {
    props.onTryAutoSignUp();
    // eslint-disable-next-line
  }, []);

  let routes = (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/auth" component={Auth} />
        {/* exact is not neccessary but we leave it. */}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );

  if (props.isAuthenticated) {
    routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          {/* We need the auth component, so login to finish purchase works */}
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

// We need to wrap connect with the withRouter, if not routing props are not passed down
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
