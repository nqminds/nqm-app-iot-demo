import BusMap from "../components/bus-map";
import {dataLoader} from "nqm-app-framework";
import * as _ from "lodash";

export const dataMapper = ({
  Meteor,
  connectionManager,
  selectBusList,
}, onData) => {
  const resourceId = Meteor.settings.public.gpsTableLatest;
  const filter = {};

  // Subscribe to the datasetData publication using the given filter and options.
  // The subscription will automatically re-run if any of the parameters change (i.e. resourceId, filter or options).
  const sub = connectionManager.subscribe("datasetData", resourceId, filter, {}, {
    onError(err) {
      console.log("error subscribing to datasetData: " + err.message + " with resourceId=" + resourceId);
    }}
  );

  if (sub.ready()) {
    // The subscription is ready
    // Add filter for dataset data (all datasetData subscriptions are stored in the same collection).
    filter._d = resourceId;

    // Fetch the data from the local cache.
    const datasetData = connectionManager.datasetDataCollection.find(filter, {}).fetch();
    const data = [];

    _.forEach(datasetData, (val) => {
      if (selectBusList[val.ID])
        data.push(val);
    });
    // Pass the data on to the component via the data property.
    onData(null, {data: data});
  }
};

export const stateMapper = (state) => ({
  busMetadata: state.bus.busMetadata,
  selectBusList: state.bus.selectBusList,
  currentBusID: state.bus.currentBusID,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.trackerFactory(dataMapper), {propsToWatch: ["selectBusList"]}),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(BusMap);
