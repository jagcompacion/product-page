import {
  SET_PRODUCTS,
  ADD_PRODUCT,
} from '../constants';

const initialState = [];
const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default products;
