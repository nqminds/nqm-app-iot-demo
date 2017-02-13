import {dataLoader} from "nqm-app-framework";
import AirDetails from "../components/air-details";

export const stateMapper = (state) => ({
  activeDetail: state.air.activeDetail,
  currentAirID: state.air.currentAirID,
  markerData: state.air.markerData,
  airMetadata: state.air.airMetadata,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.air.showDetail,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(AirDetails);
