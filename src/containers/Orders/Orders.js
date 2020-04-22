import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.authToken, props.uid);
  }, []);

  const transformedOrders = props.orders.map(order => {
    return (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        contactDetails={order.customer}
      />
    );
  });

  const orders = props.loading ? <Spinner /> : transformedOrders;

  return (
    <div className={classes.Orders}>
      <h1>My orders</h1>
      {orders}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    authToken: state.auth.token,
    uid: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, uid) => dispatch(actions.fetchOrders(token, uid))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
