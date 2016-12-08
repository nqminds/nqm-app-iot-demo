import {
  CLICK_BUS,
  SELECT_BUS,
} from "../actions/action-types";

const defaultState = {
  currentBusID: 0,
  selectBusList: {},
};

export function bus(state = defaultState, action) {
  switch (action.type) {
    case CLICK_BUS:
      return {...state, currentBusID: action.id};
    case SELECT_BUS:
      const selectBusList = {...state.selectBusList};

      if (selectBusList[action.id] === undefined)
        selectBusList[action.id] = true;
      else
        selectBusList[action.id] = !selectBusList[action.id];

      return {...state, selectBusList: selectBusList};
    default:
      return state;
  }
}

