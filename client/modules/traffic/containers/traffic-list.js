import TrafficList from "../components/traffic-list";
import {dataLoader} from "nqm-app-framework";

export const stateMapper = (state) => ({
  trafficMetadata: state.traffic.trafficMetadata,
  currentTrafficID: state.traffic.currentTrafficID,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  clickList: actions.traffic.clickList,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(TrafficList);
