import { createContext, useReducer } from 'react';
import { getProductCategory } from './api/category.js';
import { ActionTypes } from './ActionTypes/ActionTypes.js';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  catehories: [],
  product: {
    detail: {
      product: null,
      loading: true,
      error: '',
    },
    loading: false,
    list: null,
    error: null,
    isVisibleEditModal: false,
    editProductId: null,
    removeProductId: null,
    isUpdateList: true,
  },
};

function reducer(state, action) {
  const counterCartItems = (quantity) =>
    state.cart.cartItems.map((i) => {
      if (
        i._id === action.payload._id &&
        i.size === action.payload.size &&
        i.color === action.payload.color
      ) {
        return { ...i, quantity: i.quantity + quantity };
      }
      return i;
    });

  switch (action.type) {
    case ActionTypes.CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) =>
          item._id === newItem._id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existItem) {
        return { ...state };
      }

      newItem.quantity = 1;

      const cartItems = [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case ActionTypes.CART_INCREASE_ITEM:
      return {
        ...state,
        cart: { ...state.cart, cartItems: counterCartItems(1) },
      };

    case ActionTypes.CART_DECREASE_ITEM:
      return {
        ...state,
        cart: { ...state.cart, cartItems: counterCartItems(-1) },
      };

    //add to cart
    case ActionTypes.CART_REMOVE_ITEM: {
      // const cartItems = state.cart.cartItems.filter(filterCartItems())
      const cartItems = state.cart.cartItems.filter(
        (item) =>
          item._id !== action.payload._id ||
          item.size !== action.payload.size ||
          item.color !== action.payload.color
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ActionTypes.USER_SIGNIN:
      return { ...state, userInfo: action.payload };
    case ActionTypes.USER_SIGNOUT:
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    case ActionTypes.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case ActionTypes.FETCH_PRODUCT_REQUEST:
      return { ...state, product: { ...state.product, loading: true } };

    case ActionTypes.FETCH_PRODUCT_SUCCESS:
      const products = action.payload;
      return {
        ...state,
        product: { ...state.product, list: products, loading: false },
      };

    case ActionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        product: { ...state.product, list: null, loading: false },
      };

    case ActionTypes.TOGGLE_EDIT_MODAL:
      return {
        ...state,
        product: {
          ...state.product,
          isVisibleEditModal: action.payload,
        },
      };

    case ActionTypes.SET_EDIT_PRODUCT_ID:
      return {
        ...state,
        product: {
          ...state.product,
          editProductId: action.payload,
        },
      };

    case ActionTypes.SET_REMOVE_PRODUCT_ID:
      return {
        ...state,
        product: {
          ...state.product,
          removeProductId: action.payload,
        },
      };

    case ActionTypes.UPDATE_LIST_START:
      return {
        ...state,
        product: {
          ...state.product,
          isUpdateList: true,
        },
      };

    case ActionTypes.UPDATE_LIST_FINISH:
      return {
        ...state,
        product: {
          ...state.product,
          isUpdateList: false,
        },
      };

    case ActionTypes.FETCH_REQUEST_PRODUCT_DETAILS:
      return {
        ...state,
        product: {
          ...state.product,
          detail: {
            ...state.product.details,
            loading: true,
          },
        },
      };

    case ActionTypes.FETCH_SUCCESS_PRODUCT_DETAILS:
      return {
        ...state,
        product: {
          ...state.product,
          detail: {
            ...state.product.details,
            product: action.payload,
            loading: false,
          },
        },
      };

    case ActionTypes.FETCH_FAIL_PRODUCT_DETAILS:
      return {
        ...state,
        product: {
          ...state.product,
          detail: {
            ...state.product.details,
            error: action.payload,
          },
        },
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: {
          cartItems: [],
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
