/// <reference path="./interfaces/interfaces.d.ts" />

import * as React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { LOCATION_CHANGE, syncHistoryWithStore } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";
import Root from "./containers/root";
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

function bootstrap(options: BoostrapOptions) {

    // Validate options and set defaults
    if (options === undefined) { throw new Error(); };
    if (options.routes === undefined) { throw new Error(); };
    if (options.reducers === undefined) { throw new Error(); };

    // mandatory
    let routes = options.routes;
    let reducers: any = options.reducers;

    // optional
    let container = options.container || "root";
    let initialState = options.initialState || {};
    let immutableInitialState = Immutable.fromJS(initialState);
    let middlewares = options.middlewares || [];

    // Define the root reducer
    reducers.router = routerReducer;
    let rootReducer = combineReducers(reducers);

    // Configure store
    let store = configureStore(middlewares, rootReducer, immutableInitialState);

    // Create an enhanced history that syncs navigation events with the store
    let history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: (state: any) => state.get("router").toJS()
    });

    // Render Root coponent
    render(
        <Root store={store} history={history} routes={routes} />,
        document.getElementById(container)
    );

}

export default bootstrap;
