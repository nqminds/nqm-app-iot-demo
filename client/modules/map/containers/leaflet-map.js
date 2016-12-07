import LeafletMap from "../components/leaflet-map";
import {dataLoader} from "nqm-app-framework";

export const stateMapper = (state) => ({
  activeDetail: state.map.activeDetail,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.map.showDetail,
  constants: context.constants,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(LeafletMap);
