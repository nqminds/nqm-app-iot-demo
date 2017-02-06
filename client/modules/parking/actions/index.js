import * as reduxActions from "./redux-actions";

export default {
  parking: {
    setParkingMetadata({store}, metadata) {
      store.dispatch(reduxActions.setParkingMetadata(metadata));
    },
    clickMarker({store}, id) {
      store.dispatch(reduxActions.clickMarker(id));
    },
    clickList({store}, id) {
      store.dispatch(reduxActions.clickList(id));
    },
  },
};
