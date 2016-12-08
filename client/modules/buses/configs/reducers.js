import * as _ from "lodash";
import {
  CLICK_BUS,
  SELECT_BUS,
  SET_BUS_METADATA,
} from "../actions/action-types";

const defaultState = {
  currentBusID: 0,
  selectBusList: {},
  busMetadata: {},
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
    case SET_BUS_METADATA:
      const busMetadata = {};
      _.forEach(action.metadata, (val) => {
        busMetadata[val.ID] = val;
      });
      return {...state, busMetadata: busMetadata};
    default:
      return state;
  }
}

