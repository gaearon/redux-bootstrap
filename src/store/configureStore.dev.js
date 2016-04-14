import { createStore, applyMiddleware, compose } from "redux";
import DevTools from "../containers/DevTools";

export default function configureStore(middleware, rootReducer, initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            DevTools.instrument()
        )
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept("../reducers", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store
}
