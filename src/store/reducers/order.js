import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, {
    purchased: false
  });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false
  });
};

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    error: false,
    loading: false,
    purchased: true
  });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
    error: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
