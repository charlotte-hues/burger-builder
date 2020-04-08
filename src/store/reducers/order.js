import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true,
        error: false
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        error: true,
        loading: false
      });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return updateObject(state, {
        error: false,
        loading: false,
        orders: state.orders.concat({ ...action.orderData, id: action.orderId })
      });
    default:
      return state;
  }
};

export default reducer;
