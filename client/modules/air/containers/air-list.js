import AirList from "../components/air-list";
import {dataLoader} from "nqm-app-framework";

export const stateMapper = (state) => ({
  airMetadata: state.air.airMetadata,
  currentAirID: state.air.currentAirID,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  clickList: actions.air.clickList,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(AirList);
