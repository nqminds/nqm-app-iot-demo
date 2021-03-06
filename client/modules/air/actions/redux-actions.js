import * as actionTypes from "./action-types";

export const setAirMetadata = function(metadata) {
  return {type: actionTypes.SET_AIR_METADATA, metadata};
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

export const setFilterDate = function(date) {
  return {type: actionTypes.SET_FILTER_DATE, date};
};

export const setScreenSize = function(size) {
  return {type: actionTypes.SET_SCREEN_SIZE, size};
};

export const setMoleculeType = function(moltype) {
  return {type: actionTypes.SET_MOLECULE_TYPE, moltype};
};

export const setPlotType = function(plottype) {
  return {type: actionTypes.SET_PLOT_TYPE, plottype};
};
