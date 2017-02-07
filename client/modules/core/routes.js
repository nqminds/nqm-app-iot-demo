import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import framework from "nqm-app-framework";
import {syncHistoryWithStore} from "react-router-redux";

// Application pages
import BusMap from "../buses/containers/bus-map";
import ParkingMap from "../parking/containers/parking-map";
import LeafletMap from "../map/containers/leaflet-map";
// Application sidebar
import AppSideBar from "./components/app-side-bar";

// Get layout components from the framework
const Layout = framework.ui.Layout;
const NotFound = framework.ui.NotFound;

export default function(injectDeps, context, actions) {   // eslint-disable-line no-unused-vars
  const {store} = context;
  const history = syncHistoryWithStore(browserHistory, store);

  const RouterCtx = () => (
    <Router history={history}>
      <Route path="/" title="home" component={Layout}>
        <IndexRoute components={{content: BusMap, sideBarContent: AppSideBar}} />
      </Route>
      <Route path="/buses" title="Buses" component={Layout}>
        <IndexRoute components={{content: BusMap, sideBarContent: AppSideBar}} />
      </Route>
      <Route path="/traffic" title="Traffic" component={Layout}>
        <IndexRoute components={{content: LeafletMap, sideBarContent: AppSideBar}} />
      </Route>
      <Route path="/parking" title="Parking" component={Layout}>
        <IndexRoute components={{content: ParkingMap, sideBarContent: AppSideBar}} />
      </Route>
      <Route path="/air" title="Air" component={Layout}>
        <IndexRoute components={{content: BusMap, sideBarContent: AppSideBar}} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );

  const BoundRoutes = injectDeps(RouterCtx);

  ReactDOM.render(
    <BoundRoutes />,
    document.getElementById("render-root")
  );
}
