import * as _ from "lodash";
import {
  SET_TRAFFIC_METADATA,
  CLICK_MARKER,
  CLICK_LIST,
  SHOW_DETAIL,
  SET_MARKER_DATA,
  SET_FILTER_DATE,
  SET_SCREEN_SIZE,
  SET_STATS_TYPE,
} from "../actions/action-types";

const defaultState = {
  trafficMetadata: {},
  currentTrafficID: 0,
  activeDetail: "",
  markeData: {},
  filterDate: Date(),
  screenSize: {width: 300, height: 0},
  statsType: "EntryCongestionLevel",
};

/**
 * Returns the active detail of the bar
 * @function
 * @param {string} detail - detail type.
 * @returns {string} The active detail type string.
 */
function getActiveDetail(detail) {
  detail = detail || "";

  if (detail.length)
    return detail;
  else
    return "overview";
}

export function traffic(state = defaultState, action) {
  switch (action.type) {
    case SET_TRAFFIC_METADATA:
      const trafficMetadata = {};
      _.forEach(action.metadata, (val) => {
        trafficMetadata[val.ID] = val;
      });
      return {...state, trafficMetadata: trafficMetadata};
    case CLICK_MARKER:
      return {...state, currentTrafficID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case CLICK_LIST:
      return {...state, currentTrafficID: action.id, activeDetail: getActiveDetail(state.activeDetail)};
    case SHOW_DETAIL:
      return {...state, activeDetail: action.detail};
    case SET_MARKER_DATA:
      const markerData = {...state.markeData};
      _.forEach(action.data, (val) => {
        markerData[val.ID] = val;
      });
      return {...state, markerData: markerData};
    case SET_FILTER_DATE:
      return {...state, filterDate: action.date};
    case SET_SCREEN_SIZE:
      return {...state, screenSize: action.size};
    case SET_STATS_TYPE:
      return {...state, statsType: action.statstype};
    default:
      return {...state};
  }
}

