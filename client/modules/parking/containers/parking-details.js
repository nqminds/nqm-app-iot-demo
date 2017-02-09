import {dataLoader} from "nqm-app-framework";
import ParkingDetails from "../components/parking-details";

export const stateMapper = (state) => ({
  activeDetail: state.parking.activeDetail,
  currentParkingID: state.parking.currentParkingID,
  markerData: state.parking.markerData,
  parkingMetadata: state.parking.parkingMetadata,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.parking.showDetail,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingDetails);
