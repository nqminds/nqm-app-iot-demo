import {dataLoader} from "nqm-app-framework";
import ParkingDetails from "../components/parking-details";

export const stateMapper = (state) => ({
  activeDetail: state.map.activeDetail,
  currentParkingID: state.map.currentParkingID,
  markerData: state.map.markerData,
  parkingMetadata: state.parking.parkingMetadata,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.map.showDetail,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingDetails);
