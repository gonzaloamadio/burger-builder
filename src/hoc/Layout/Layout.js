import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// We use state here to manage/coordinate which components to show and hide.
// For example, nav items.
const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

// ------------------ REDUX -------------------------

const mapStateToprops = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToprops)(Layout);
