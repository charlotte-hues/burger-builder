import React from "react";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import axios from "../../axios-order";

class Orders extends React.Component {
  state = {
    orders: []
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders });
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    const transformedOrders = this.state.orders.map(order => {
      console.log(order);
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          contactDetails={order.customer}
        />
      );
    });

    return (
      <div className={classes.Orders}>
        <h1>My orders</h1>
        {transformedOrders}
      </div>
    );
  }
}

export default Orders;
