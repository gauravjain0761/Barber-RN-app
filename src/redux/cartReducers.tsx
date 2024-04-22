import {
  ADD_TO_CART,
  CART_COUNT,
  CART_DETAILS,
  GETALLSERVICES,
} from "../actions/dispatchTypes";

const initialState = {
  getallservices: [],
  addtocart: [],
  cartDetails: [],
  cartCount: 0,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GETALLSERVICES: {
      return { ...state, getallservices: action.payload };
    }
    case ADD_TO_CART: {
      return { ...state, addtocart: action.payload };
    }
    case CART_DETAILS: {
      return { ...state, cartDetails: action.payload };
    }
    case CART_COUNT: {
      return { ...state, cartCount: action.payload };
    }
    default:
      return state;
  }
}
