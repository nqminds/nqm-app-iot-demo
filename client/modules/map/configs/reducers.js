import {
  SHOW_DETAIL,
} from "../actions/action-types";

const defaultState = {
  activeDetail: "",
};

export function map(state = defaultState, action) {
  switch (action.type) {
    case SHOW_DETAIL:
      return {...state, activeDetail: action.detail};
    default:
      return state;
  }
}

