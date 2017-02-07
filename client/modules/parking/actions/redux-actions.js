import * as actionTypes from "./action-types";

export const setParkingMetadata = function(metadata) {
  return {type: actionTypes.SET_PARKING_METADATA, metadata};
};

export const clickMarker = function(id) {
  return {type: actionTypes.CLICK_MARKER, id};
};

export const clickList = function(id) {
  return {type: actionTypes.CLICK_LIST, id};
};

export const showDetail = function(detail) {
  return {type: actionTypes.SHOW_DETAIL, detail};
};

export const setMarkerData = function(data) {
  return {type: actionTypes.SET_MARKER_DATA, data};
};
