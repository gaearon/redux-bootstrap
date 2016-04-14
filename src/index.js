import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";

function bootstrap(options) {
    
    // Set default options
    options = options || {};
    const container = options.container || "root";
    const routes = options.reducers || {};
    const reducers = options.reducers || {};
    const reducersPath = options.reducersPath || "../reducers";
    const initialState = options.initialState || Immutable.Map();
    const middleware = options.middleware || [];

    // Define the root reducer
    const rootReducer = combineReducers(reducers);

    // Configure store
    const store = configureStore(middleware, rootReducer, initialState);

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store);

    // Render Root coponent
    render(
        <Root store={store} history={history} routes={routes} />,
        document.getElementById(container)
    );

}

export default bootstrap;
