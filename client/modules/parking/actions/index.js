import * as reduxActions from "./redux-actions";

export default {
  parking: {
    setParkingMetadata({store}, metadata) {
      store.dispatch(reduxActions.setParkingMetadata(metadata));
    },
  },
};
