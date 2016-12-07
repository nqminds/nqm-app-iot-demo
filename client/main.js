import {createApp} from "mantra-core";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import framework from "nqm-app-framework";
import initContext from "./configs/context";

// modules
import frameworkModule from "nqm-app-framework/modules/core";
import coreModule from "./modules/core";
import homeModule from "./modules/home";
import mapModule from "./modules/map";

// reducers
const reducer = combineReducers({
  ...frameworkModule.reducers,
  ...coreModule.reducers,
  ...mapModule.reducers,
  routing: routerReducer,
});

// init context
const context = initContext({framework, reducer});

// create app
const app = createApp(context);

// load modules
app.loadModule(frameworkModule);
app.loadModule(coreModule);
app.loadModule(homeModule);
app.loadModule(mapModule);

// go
app.init();
