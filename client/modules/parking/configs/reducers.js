import * as _ from "lodash";
import {
  SET_PARKING_METADATA,
  CLICK_MARKER,
  CLICK_LIST,
  SHOW_DETAIL,
  SET_MARKER_DATA,
} from "../actions/action-types";

const defaultState = {
  parkingMetadata: {},
  currentParkingID: 0,
  activeDetail: "",
  markeData: {},
};

// Trigger the stats view
function getActiveDetail(detail) {
  detail = detail || "";

  if (detail.length)
    return detail;
  else
    return "overview";
}

export function parking(state = defaultState, action) {
  switch (action.type) {
    case SET_PARKING_METADATA:
      const parkingMetadata = {};
      _.forEach(action.metadata, (val) => {
        parkingMetadata[val.LotCode] = val;
      });
      return {...state, parkingMetadata: parkingMetadata};
    case CLICK_MARKER:
      return {...state, currentParkingID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case CLICK_LIST:
      return {...state, currentParkingID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case SHOW_DETAIL:
      return {...state, activeDetail: action.detail};
    case SET_MARKER_DATA:
      const markerData = _.clone(state.markeData);
      _.forEach(action.data, (val) => {
        markerData[val.ID] = val.currentvalue;
      });
      return {...state, markerData: markerData};
    default:
      return state;
  }
}

