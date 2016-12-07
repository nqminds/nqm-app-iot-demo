import {dataLoader} from "nqm-app-framework";
import HomeMenu from "../components/home-menu";

const depsMapper = (context, actions) => ({
  store: context.store,
  setSidebarFloating: actions.sidebar.setFloating,
});

export default dataLoader.merge(
  dataLoader.useDeps(depsMapper)
)(HomeMenu);


