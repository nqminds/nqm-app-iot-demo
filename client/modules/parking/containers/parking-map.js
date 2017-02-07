import ParkingMap from "../components/parking-map";
import {dataLoader} from "nqm-app-framework";
import * as _ from "lodash";

const dataMapper = ({
  Meteor,
  connectionManager,
  setMarkerData,
}, onData) => {
  const resourceId = Meteor.settings.public.parkingTableLatest;
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

// Retrieve the metadata for parking
const getParkingMetadata = ({Meteor, connectionManager, setParkingMetadata}, onData) => {
  const resourceId = Meteor.settings.public.parkingMetadata;

  connectionManager.tdxApi.getDatasetData(resourceId, null, null, null, (err, data) => {
    if (err)
      onData(err, {});
    else {
      // Save the parkingMetadata into the state
      setParkingMetadata(data.data);
      onData(null, {});
    }
  });
};

export const stateMapper = (state) => ({
  parkingMetadata: state.parking.parkingMetadata,
  currentParkingID: state.parking.currentParkingID,
  activeDetail: state.parking.activeDetail,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setParkingMetadata: actions.parking.setParkingMetadata,
  clickMarker: actions.parking.clickMarker,
  showDetail: actions.parking.showDetail,
  setMarkerData: actions.parking.setMarkerData,
});

export default dataLoader.merge(
  dataLoader.compose(getParkingMetadata),
  dataLoader.compose(dataLoader.trackerFactory(dataMapper)),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingMap);
