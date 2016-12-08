import * as reduxActions from "./redux-actions";

export default {
  map: {
    showDetail({store}, detail) {
      store.dispatch(reduxActions.showDetail(detail));
    },
  },
};
