/// <reference path="./interfaces/interfaces.d.ts" />

import * as React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";
import getRoot from "./containers/root";
import configureStore from "./store/configure_store";

const initialRouterReducerState = Immutable.fromJS({
    locationBeforeTransitions: null
});

let routerReducer = (state = initialRouterReducerState, action: any) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
};

function bootstrap(options: BoostrapOptions): Redux.Store {

    // Validate options and set defaults
    if (options === undefined) { throw new TypeError("Null argument options."); };
    if (options.routes === undefined) { throw new TypeError("Invalid configuration field: routes."); };
    if (options.reducers === undefined) { throw new TypeError("Invalid configuration field: reducers."); };

    // mandatory
    let routes = options.routes;
    let reducers: any = options.reducers;

    // optional
    let container = options.container || "root";
    let initialState = options.initialState || {};
    let immutableInitialState = Immutable.fromJS(initialState);
    let middlewares = options.middlewares || [];

    // Define the root reducer
    reducers.routing = routerReducer;
    let rootReducer = combineReducers(reducers);

    // Configure store
    let routerMddlwr: Redux.Middleware = routerMiddleware(browserHistory);
    const store = configureStore([...middlewares, routerMddlwr], rootReducer, immutableInitialState);

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: (state: any) => state.get("routing").toJS()
    });

    // Render Root coponent
    render(
        getRoot(store, history, routes),
        document.getElementById(container)
    );

    return store;

}

export default bootstrap;
