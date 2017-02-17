import AirSettings from "../components/air-settings";
import {dataLoader} from "nqm-app-framework";

export const stateMapper = (state) => ({
  moleculeType: state.air.moleculeType,
  plotType: state.air.plotType,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  Meteor: context.Meteor,
  connectionManager: context.connectionManager,
  setMoleculeType: actions.air.setMoleculeType,
  setPlotType: actions.air.setPlotType,
  setSidebarFloating: actions.sidebar.setFloating,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(AirSettings);
