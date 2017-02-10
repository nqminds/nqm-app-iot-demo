import ParkingStats from "../components/parking-stats";
import {dataLoader} from "nqm-app-framework";

import * as _ from "lodash";

// Retrieve the metadata for parking
const getParkingData = ({Meteor, connectionManager, currentParkingID, filterDate}, onData) => {
  const resourceId = Meteor.settings.public.parkingTable;
  const date = new Date(filterDate);

  // Clear the minutes, seconds and milliseconds and start from 10am
  date.setHours(10);
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
    else {
      const plotData = [];

      _.forEach(data.data, (elem) => {
        plotData.push({x: elem.timestamp, y: elem.currentvalue});
      });
      onData(null, {data: plotData});
    }
  });
};

export const stateMapper = (state) => ({
  currentParkingID: state.parking.currentParkingID,
  filterDate: state.parking.filterDate,
  screenSize: state.parking.screenSize,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setFilterDate: actions.parking.setFilterDate,
  setScreenSize: actions.parking.setScreenSize,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.trackerFactory(getParkingData), {propsToWatch: ["filterDate", "currentParkingID"]}),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingStats);
