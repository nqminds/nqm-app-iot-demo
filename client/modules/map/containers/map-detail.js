import {dataLoader} from "nqm-app-framework";
import MapDetail from "../components/map-detail";

export const depsMapper = (context, actions) => ({
  setSidebarFloating: actions.sidebar.setFloating,
});

const factoryCreate = (component) => {
  return dataLoader.merge(
    dataLoader.useDeps(depsMapper)
  )(MapDetail(component));
};

export default factoryCreate;

// export const depsMapper = (context, actions) => ({
//   setSidebarFloating: actions.sidebar.setFloating,
// });

// export default dataLoader.merge(
//   dataLoader.useDeps(depsMapper)
// )(MapDetail);
