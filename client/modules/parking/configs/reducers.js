import * as _ from "lodash";
import {
  SET_PARKING_METADATA,
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
        parkingMetadata[val.ID] = val;
      });
      return {...state, parkingMetadata: parkingMetadata};
    default:
      return state;
  }
}

