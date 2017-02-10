import TrafficStats from "../components/traffic-stats";
import {dataLoader} from "nqm-app-framework";

import * as _ from "lodash";

// Retrieve the metadata for traffic
const getTrafficData = ({Meteor, connectionManager, currentTrafficID, filterDate}, onData) => {
  const resourceId = Meteor.settings.public.trafficTable;
  const date = new Date(filterDate);

  // Clear the minutes, seconds and milliseconds and start from 10am
  date.setHours(10);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const options = {sort: {timestamp: 1}, limit: 1000};
  // Get only the current selected marker and the seleced time
  const filter = {ID: {"$eq": currentTrafficID}, timestamp: {"$gte": date.getTime()}};
  // Select only two fields
  const project = {currentvalue: 1, timestamp: 1};

  connectionManager.tdxApi.getDatasetData(resourceId, filter, project, options, (err, data) => {
    if (err)
      onData(err, {});
    else {
      const plotData = [];

      // Make the y key depended on the dataset field
      _.forEach(data.data, (elem) => {
        plotData.push({x: elem.timestamp, y: elem.RoundaboutEntry});
      });
      onData(null, {data: plotData});
    }
  });
};

export const stateMapper = (state) => ({
  currentTrafficID: state.traffic.currentTrafficID,
  filterDate: state.traffic.filterDate,
  screenSize: state.traffic.screenSize,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setFilterDate: actions.traffic.setFilterDate,
  setScreenSize: actions.traffic.setScreenSize,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.trackerFactory(getTrafficData), {propsToWatch: ["filterDate", "currentTrafficID"]}),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(TrafficStats);
