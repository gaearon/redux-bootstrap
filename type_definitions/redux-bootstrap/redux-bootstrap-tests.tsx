/// <reference path="../redux/redux.d.ts" />
/// <reference path="../react/react.d.ts" />
/// <reference path="./redux-bootstrap.d.ts" />

import bootstrap from "redux-bootstrap";

let routes: JSX.Element = null;

bootstrap({
    container: "root",
    initialState: {},
    middlewares: [],
    reducers: {
        reposReducer: (previousState: any, action: any) => { return null; },
        usersReducer: (previousState: any, action: any) => { return null; }
    },
    routes: routes
});
