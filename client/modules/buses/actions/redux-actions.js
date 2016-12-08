import * as actionTypes from "./action-types";

export const clickBus = function(id) {
  return {type: actionTypes.CLICK_BUS, id};
};

export const selectBus = function(id) {
  return {type: actionTypes.SELECT_BUS, id};
};

export const setBusMetadata = function(metadata) {
  return {type: actionTypes.SET_BUS_METADATA, metadata};
};
