import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/my-orders" component={Orders} />
        <Route path="/login" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
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
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
