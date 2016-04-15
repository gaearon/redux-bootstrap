# redux-bootstrap
[![Build Status](https://travis-ci.org/remojansen/redux-bootstrap.svg?branch=master)](https://travis-ci.org/remojansen/redux-bootstrap)
[![npm version](https://badge.fury.io/js/redux-bootstrap.svg)](https://badge.fury.io/js/redux-bootstrap)
[![Dependencies](https://david-dm.org/remojansen/redux-bootstrap.svg)](https://david-dm.org/remojansen/redux-bootstrap#info=dependencies)
[![img](https://david-dm.org/remojansen/redux-bootstrap/dev-status.svg)](https://david-dm.org/remojansen/redux-bootstrap/#info=devDependencies)
[![img](https://david-dm.org/remojansen/redux-bootstrap/peer-status.svg)](https://david-dm.org/remojansen/redux-bootstrap/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/remojansen/redux-bootstrap/badge.svg)](https://snyk.io/test/github/remojansen/redux-bootstrap)


[![NPM](https://nodei.co/npm/redux-bootstrap.png?downloads=true&downloadRank=true)](https://nodei.co/npm/redux-bootstrap/)
[![NPM](https://nodei.co/npm-dl/redux-bootstrap.png?months=9&height=3)](https://nodei.co/npm/redux-bootstrap/)

Bootstrapping function for Redux applications. Redux bootstrap does not generate files for you. It is not a project template or project scaffolding tool.

## Why Do I Need This?
This library handles most of the common application initialization/bootstraping that takes place everytime you create a new Redux project.

When you create a new Redux project you usually need to take care about a few things:

- Install dependencies.
- Integrate the React router with Redux.
- Create a Root reducer.
- Enable DevTools is environment is development / Disable if environment is production.
- Integrate Immutable with Redux.
- Apply middleware.
- Combine reducers into a root reducer.
- Create the store.
- Sync history with store.
- Create the Root component (Provider, Router).
- Set the routes, history and store in the Root component.
- Render the Root component.

Redux bootrap handles all this stuff for you! 

# How Can I Use It?

Install it via npm:

```
npm install --save redux-bootstrap
```

The preceding command will install `redux-bootstrap` and the following dependencies:

```json
"immutable": "^3.7.6",
"react": "^15.0.1",
"react-dom": "^15.0.1",
"react-redux": "^4.4.4",
"react-router-redux": "^4.0.2",
"redux": "^3.4.0",
"redux-devtools": "^3.2.0",
"redux-devtools-dock-monitor": "^1.1.1",
"redux-devtools-log-monitor": "^1.0.10",
"redux-immutable": "^3.0.6"
```
 
Then use the bootstrap function in your application's entry point.

All you need to do is import you routes file, your reducers and any additional middleware 
and pass them to the bootstrap function as configuration:

```ts
import bootstrap from "redux-bootstrap";
import routes from "./routes";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import usersReducer from "./reducers/fooReducer";
import reposReducer from "./reducers/barReducer";

bootstrap({
    container: "root",                    // optional
    initialState: {},                     // optional
    middlewares: [thunk, createLogger()], // optional
    reducers: {
        usersReducer,
        reposReducer,
    },
    routes: routes
});
```

That's it, Routing, Immutable, DevTools and Hot loader are ready 
and you can start working on your app!

# TypeScript support
The npm package includes type definitions:

```ts
/// <reference path="node_modules/redux-bootstrap/type_definitions/redux-bootstrap/redux-bootstrap.d.ts" />
```

TypeScript is recommended if you want to enjoy the best development experience.
