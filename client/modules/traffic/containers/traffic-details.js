import {dataLoader} from "nqm-app-framework";
import TrafficDetails from "../components/traffic-details";

export const stateMapper = (state) => ({
  activeDetail: state.traffic.activeDetail,
  currentTrafficID: state.traffic.currentTrafficID,
  markerData: state.traffic.markerData,
  trafficMetadata: state.traffic.trafficMetadata,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.traffic.showDetail,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(TrafficDetails);
