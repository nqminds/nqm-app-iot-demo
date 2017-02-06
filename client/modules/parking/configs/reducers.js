import * as _ from "lodash";
import {
  SET_PARKING_METADATA,
  CLICK_MARKER,
  CLICK_LIST,
} from "../actions/action-types";

const defaultState = {
  parkingMetadata: {},
  currentParkingID: 0,
};

export function parking(state = defaultState, action) {
  switch (action.type) {
    case SET_PARKING_METADATA:
      const parkingMetadata = {};
      _.forEach(action.metadata, (val) => {
        parkingMetadata[val.LotCode] = val;
      });
      return {...state, parkingMetadata: parkingMetadata};
    case CLICK_MARKER:
      return {...state};
    case CLICK_LIST:
      return {...state, currentParkingID: action.id};
    default:
      return state;
  }
}

