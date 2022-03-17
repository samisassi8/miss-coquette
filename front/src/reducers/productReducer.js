import { LOAD_PRODUCTS } from "../actions/product/actions-types";

const initialState = {
  products: [],
};

export default function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { products: action.payload };

    default:
      return state;
  }
}
