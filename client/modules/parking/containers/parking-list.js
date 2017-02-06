import ParkingList from "../components/parking-list";
import {dataLoader} from "nqm-app-framework";

export const stateMapper = (state) => ({
  parkingMetadata: state.parking.parkingMetadata,
  currentParkingID: state.parking.currentParkingID,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  clickList: actions.parking.clickList,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(ParkingList);
