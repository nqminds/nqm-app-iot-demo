import AirStats from "../components/air-stats";
import {dataLoader} from "nqm-app-framework";

import * as _ from "lodash";

// Retrieve the metadata for air
const getAirData = ({Meteor, connectionManager, currentAirID, filterDate, moleculeType}, onData) => {
  const resourceId = Meteor.settings.public.airTable;
  const date = new Date(filterDate);

  // Clear the minutes, seconds and milliseconds and start from 10am
  date.setHours(10);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Timestamp in milliseconds
  const timestamp = date.getTime();

  const options = {sort: {timestamp: 1}, limit: 1000};
  // Get only the current selected marker and the selected time
  const filter = {SiteCode: {"$eq": currentAirID}, timestamp: {"$gte": timestamp}};

  connectionManager.tdxApi.getDatasetData(resourceId, filter, null, options, (err, data) => {
    if (err)
      onData(err, {});
    else {
      const plotData = [];

      _.forEach(data.data, (elem) => {
        const x = elem.timestamp || timestamp;
        const y = elem.Species[moleculeType] || 0;
        plotData.push({x: x, y: y});
      });

      // Assign defualt value if empty
      if (!plotData.length)
        plotData.push({x: timestamp, y: 0});

      onData(null, {data: plotData});
    }
  });
};

export const stateMapper = (state) => ({
  currentAirID: state.air.currentAirID,
  filterDate: state.air.filterDate,
  screenSize: state.air.screenSize,
  moleculeType: state.air.moleculeType,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  constants: context.constants,
  setFilterDate: actions.air.setFilterDate,
  setScreenSize: actions.air.setScreenSize,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.trackerFactory(getAirData), {propsToWatch: ["filterDate", "currentAirID", "moleculeType"]}),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(AirStats);
