import * as _ from "lodash";
import {
  SET_PARKING_METADATA,
  CLICK_MARKER,
  CLICK_LIST,
  SHOW_DETAIL,
  SET_MARKER_DATA,
  SET_FILTER_DATE,
  SET_SCREEN_SIZE,
} from "../actions/action-types";

const defaultParkingState = {
  parkingMetadata: {},
  currentParkingID: 0,
  activeDetail: "",
  markeData: {},
  filterDate: Date(),
  screenSize: {width: 300, height: 0},
};

// Trigger the stats view
function getActiveDetail(detail) {
  detail = detail || "";

  if (detail.length)
    return detail;
  else
    return "overview";
}

export function parking(state = defaultParkingState, action) {
  switch (action.type) {
    case SET_PARKING_METADATA:
      const parkingMetadata = {};
      _.forEach(action.metadata, (val) => {
        parkingMetadata[Number(val.LotCode)] = val;
      });
      return {...state, parkingMetadata: parkingMetadata};
    case CLICK_MARKER:
      return {...state, currentParkingID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case CLICK_LIST:
      return {...state, currentParkingID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case SHOW_DETAIL:
      return {...state, activeDetail: action.detail};
    case SET_MARKER_DATA:
      const markerData = {...state.markeData};
      _.forEach(action.data, (val) => {
        markerData[Number(val.ID)] = val.currentvalue;
      });
      return {...state, markerData: markerData};
    case SET_FILTER_DATE:
      return {...state, filterDate: action.date};
    case SET_SCREEN_SIZE:
      return {...state, screenSize: action.size};
    default:
      return {...state};
  }
}

