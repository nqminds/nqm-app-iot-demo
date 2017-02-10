import TrafficMap from "../components/traffic-map";
import {dataLoader} from "nqm-app-framework";

const dataMapper = ({
  Meteor,
  connectionManager,
  setMarkerData,
}, onData) => {
  const resourceId = Meteor.settings.public.trafficTableLatest;
  const filter = {};

  // Subscribe to the datasetData publication using the given filter and options.
  // The subscription will automatically re-run if any of the parameters change (i.e. resourceId, filter or options).
  const sub = connectionManager.subscribe("datasetData", resourceId, filter, {}, {
    onError(err) {
      console.log(`error subscribing to datasetData: ${err.message} with resourceId=${resourceId}`);
    }}
  );

  if (sub.ready()) {
    // The subscription is ready
    // Add filter for dataset data (all datasetData subscriptions are stored in the same collection).
    filter._d = resourceId;

    // Fetch the data from the local cache.
    const datasetData = connectionManager.datasetDataCollection.find(filter, {}).fetch();

    // Store the marker real-time data
    setMarkerData(datasetData);

    // Pass the data on to the component via the data property.
    onData(null, {data: datasetData});
  }
};

// Retrieve the metadata for traffic
const getTrafficMetadata = ({Meteor, connectionManager, setTrafficMetadata}, onData) => {
  const resourceId = Meteor.settings.public.trafficMetadata;

  connectionManager.tdxApi.getDatasetData(resourceId, null, null, null, (err, data) => {
    if (err)
      onData(err, {});
    else {
      // Save the trafficMetadata into the state
      setTrafficMetadata(data.data);
      onData(null, {});
    }
  });
};

export const stateMapper = (state) => ({
  trafficMetadata: state.traffic.trafficMetadata,
  currentTrafficID: state.traffic.currentTrafficID,
  activeDetail: state.traffic.activeDetail,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setTrafficMetadata: actions.traffic.setTrafficMetadata,
  clickMarker: actions.traffic.clickMarker,
  showDetail: actions.traffic.showDetail,
  setMarkerData: actions.traffic.setMarkerData,
});

export default dataLoader.merge(
  dataLoader.compose(getTrafficMetadata),
  dataLoader.compose(dataLoader.trackerFactory(dataMapper)),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(TrafficMap);
