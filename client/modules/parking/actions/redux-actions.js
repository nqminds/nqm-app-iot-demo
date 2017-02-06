import * as actionTypes from "./action-types";

export const setParkingMetadata = function(metadata) {
  return {type: actionTypes.SET_PARKING_METADATA, metadata};
};

export const clickMarker = function(id) {
  return {type: actionTypes.CLICK_MARKER, id};
};
