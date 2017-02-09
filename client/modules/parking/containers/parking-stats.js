import ParkingStats from "../components/parking-stats";
import {dataLoader} from "nqm-app-framework";

// Retrieve the metadata for parking
const getParkingData = ({Meteor, connectionManager, currentParkingID, filterDate}, onData) => {
  const resourceId = Meteor.settings.public.parkingTable;
  const date = new Date(filterDate);

  // Clear the minutes, seconds and milliseconds and start from 8am
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const options = {sort: {timestamp: 1}, limit: 1000};
  // Get only the current selected marker and the seleced time
  const filter = {ID: {"$eq": currentParkingID}, timestamp: {"$gte": date.getTime()}};
  // Select only two fields
  const project = {currentvalue: 1, timestamp: 1};

  connectionManager.tdxApi.getDatasetData(resourceId, filter, project, options, (err, data) => {
    if (err)
      onData(err, {});
    else
      onData(null, {data: data.data});
  });
};

export const stateMapper = (state) => ({
  currentParkingID: state.parking.currentParkingID,
  filterDate: state.parking.filterDate,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setFilterDate: actions.parking.setFilterDate,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.trackerFactory(getParkingData, {propsToWatch: ["statsTimestamp", "currentParkingID"]})),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingStats);
