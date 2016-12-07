import * as actionTypes from "./action-types";

export const showDetail = function(detail) {
  return {type: actionTypes.SHOW_DETAIL, detail};
};
