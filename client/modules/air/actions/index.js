import * as reduxActions from "./redux-actions";

export default {
  air: {
    setAirMetadata({store}, metadata) {
      store.dispatch(reduxActions.setAirMetadata(metadata));
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

    setMoleculeType({store}, moltype) {
      store.dispatch(reduxActions.setMoleculeType(moltype));
    },

    setPlotType({store}, plottype) {
      store.dispatch(reduxActions.setPlotType(plottype));
    },
  },
};
