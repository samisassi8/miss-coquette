import { CONNECT_USER, LOGOUT_USER } from "../actions/user/actions-types";

const initialState = {
  infos: {},
  isLogged: false,
};

//fonction UserReducer qui va mettre à jour notre store
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER:
      return { infos: action.payload, isLogged: true };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
