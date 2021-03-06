// Type definitions for react-bootstrap v1.0.0
// Project: https://github.com/remojansen/redux-bootstrap
// Definitions by: Remo H. Jansen <https://github.com/remojansen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../redux/redux.d.ts" />
/// <reference path="../react/react.d.ts" />

declare module "redux-immutable" {

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

    export function bootstrap(options: BoostrapOptions): void;
}
