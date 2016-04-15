/// <reference path="../../typings/browser.d.ts" />
/// <reference path="../../node_modules/immutable/dist/immutable.d.ts" />

interface BoostrapOptions {
    routes: JSX.Element;
    reducers: ReducersOption;
    middlewares?: Redux.Middleware[];
    initialState?: any;
    container?: string;
}

interface ReducersOption {
    [index: string]: Redux.Reducer;
}

interface RootComponentProps {
    store: Redux.Store;
    history: ReactRouterRedux.ReactRouterReduxHistory;
    routes: JSX.Element;
}

interface NodeModule {
    hot: {
        accept: (path: string, cb: () => void) => void;
    };
}
