import { combineReducers } from "redux";
import ProductReducer from './productReducer';
import BasketReducer from './basketReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    basket: BasketReducer,
    user: UserReducer
});

export default rootReducer;