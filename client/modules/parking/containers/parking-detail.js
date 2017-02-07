import {dataLoader} from "nqm-app-framework";
import ParkingDetail from "../components/parking-detail";

export const depsMapper = (context, actions) => ({
  setSidebarFloating: actions.sidebar.setFloating,
});

const factoryCreate = (component) => {
  return dataLoader.merge(
    dataLoader.useDeps(depsMapper)
  )(ParkingDetail(component));
};

export default factoryCreate;
