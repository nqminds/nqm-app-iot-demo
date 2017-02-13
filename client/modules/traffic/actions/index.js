import * as reduxActions from "./redux-actions";

export default {
  traffic: {
    setTrafficMetadata({store}, metadata) {
      store.dispatch(reduxActions.setTrafficMetadata(metadata));
    },

    clickMarker({store}, id) {
      store.dispatch(reduxActions.clickMarker(id));
    },

    clickList({store}, id) {
      store.dispatch(reduxActions.clickList(id));
    },

    showDetail({store}, detail) {
      store.dispatch(reduxActions.showDetail(detail));
    },

    setMarkerData({store}, data) {
      store.dispatch(reduxActions.setMarkerData(data));
    },

    setFilterDate({store}, date) {
      store.dispatch(reduxActions.setFilterDate(date));
    },

    setScreenSize({store}, size) {
      store.dispatch(reduxActions.setScreenSize(size));
    },

    setStatsType({store}, statstype) {
      store.dispatch(reduxActions.setStatsType(statstype));
    },
  },
};
