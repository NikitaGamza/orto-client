import CartTypes from './CartTypes';
import ProductTypes from './ProductTypes';
export const ActionTypes = {
  //CART
  ...CartTypes,

  //shipping
  SAVE_SHIPPING_ADDRESS: 'SAVE_SHIPPING_ADDRESS',

  //UPDATE
  UPDATE_LIST_START: 'UPDATE_LIST_START',
  UPDATE_LIST_FINISH: 'UPDATE_LIST_FINISH',

  // Product details
  ...ProductTypes,

  TOGGLE_EDIT_MODAL: 'TOGGLE_EDIT_MODAL',

  //CATEGORIES
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',

  //USER
  USER_SIGNIN: 'USER_SIGNIN',
  USER_SIGNOUT: 'USER_SIGNOUT', //
};
