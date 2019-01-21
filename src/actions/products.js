import {
  SET_PRODUCTS,
  ADD_PRODUCT,
} from '../constants';

export const getProducts = () => {
  return dispatch => {
    dispatch({
      type: SET_PRODUCTS,
      payload: [],
    });
  };
};

export const addProduct = (product) => {
  return dispatch => {
    dispatch({
      type: ADD_PRODUCT,
      payload: product,
    })
  }
}
