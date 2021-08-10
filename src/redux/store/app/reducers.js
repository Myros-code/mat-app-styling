import { RESET_STORE } from "../../actionTypes/actionTypes";

const initialState = {
  clearStore: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE:
      return { ...state, clearStore: true };
    default:
      return state;
  }
};
