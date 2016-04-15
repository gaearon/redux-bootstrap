// Type definitions for react-bootstrap v1.0.0
// Project: https://github.com/remojansen/redux-bootstrap
// Definitions by: Remo H. Jansen <https://github.com/remojansen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../react-router.d.ts" />
/// <reference path="../redux/redux.d.ts" />

declare module "redux-immutable" {

    interface BoostrapOptions {
        routes: ReactRouter.Route;
        reducers: Redux.Reducer;
        middlewares?: Redux.Middleware[];
        initialState?: any;
        container?: string;
    }

    export function bootstrap(options: BoostrapOptions): void;
}
