import BusList from "../components/bus-list";
import {dataLoader} from "nqm-app-framework";

export const dataMapper = ({
  Meteor,
  connectionManager,
  setBusMetadata,
}, onData) => {
  connectionManager.tdxApi.getDatasetData(Meteor.settings.public.busTable, null, null, null, (err, data) => {
    if (err)
      onData(err, {data: []});
    else {
      if (data.data.length)
        setBusMetadata(data.data);
      onData(null, {data: data.data});
    }
  });
};

export const stateMapper = (state) => ({
  currentBusID: state.bus.currentBusID,
  selectBusList: state.bus.selectBusList,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  clickBus: actions.bus.clickBus,
  selectBus: actions.bus.selectBus,
  setBusMetadata: actions.bus.setBusMetadata,
});

export default dataLoader.merge(
  dataLoader.compose(dataMapper),
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(BusList);
