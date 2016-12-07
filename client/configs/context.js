/* eslint-disable no-underscore-dangle */
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import {createStore} from "redux";

// Create and return the application context
export default function({framework, reducer}) {
  return {
    Meteor,
    Tracker,
    connectionManager: framework.connectionManager,
    constants: framework.constants,
    store: createStore(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()),
  };
}
