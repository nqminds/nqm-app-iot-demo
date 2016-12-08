import * as reduxActions from "./redux-actions";

export default {
  bus: {
    clickBus({store}, id) {
      store.dispatch(reduxActions.clickBus(id));
    },
    selectBus({store}, id) {
      store.dispatch(reduxActions.selectBus(id));
    },
  },
};
