import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import DevTools from "../containers/DevTools";

export default function configureStore(middleware, rootReducer, reducersPath, initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...[...middleware, createLogger()]),
            DevTools.instrument()
        )
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept(reducersPath, () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store
}
