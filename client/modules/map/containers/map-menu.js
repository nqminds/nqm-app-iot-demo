import {dataLoader} from "nqm-app-framework";
import MapMenu from "../components/map-menu";

export const stateMapper = (state) => ({
  activeDetail: state.map.activeDetail,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  showDetail: actions.map.showDetail,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(MapMenu);
