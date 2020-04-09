import React from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const transformedOrders = this.props.orders.map(order => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          contactDetails={order.customer}
        />
      );
    });

    const orders = this.props.loading ? <Spinner /> : transformedOrders;

    return (
      <div className={classes.Orders}>
        <h1>My orders</h1>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
