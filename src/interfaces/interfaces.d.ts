/// <reference path="../../typings/browser.d.ts" />
/// <reference path="../../node_modules/immutable/dist/immutable.d.ts" />

interface BoostrapOptions {
    container: string;
    routes: ReactRouter.Route;
    reducers: Redux.Reducer;
    initialState: any;
    middlewares: Redux.Middleware[];
}

interface RootComponentProps {
    store: Redux.Store;
    history: ReactRouterRedux.ReactRouterReduxHistory;
    routes: ReactRouter.Route;
}

interface NodeModule {
    hot: {
        accept: (path: string, cb: () => void) => void;
    };
}
