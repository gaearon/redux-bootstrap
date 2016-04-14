import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";

function bootstrap(options) {
    
    // Validate options and set defaults
    if (options === undefined) throw new Error();
    if (options.container === undefined) throw new Error();
    if (options.routes === undefined) throw new Error();
    if (options.reducers === undefined) throw new Error();
    let initialState = options.initialState || Immutable.Map();
    let middleware = options.middleware || [];

    // Define the root reducer
    let rootReducer = combineReducers({
        ...options.reducers,
        routing: routerReducer
    });

    // Configure store
    let store = configureStore(middleware, rootReducer, initialState);

    // Create an enhanced history that syncs navigation events with the store
    let history = syncHistoryWithStore(browserHistory, store);

    // Render Root coponent
    render(
        <Root store={store} history={history} routes={options.routes} />,
        document.getElementById(options.container)
    );

}

export default bootstrap;
