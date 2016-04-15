# redux-bootstrap
[![Build Status](https://travis-ci.org/remojansen/redux-bootstrap.svg?branch=master)](https://travis-ci.org/remojansen/redux-bootstrap)
[![npm version](https://badge.fury.io/js/redux-bootstrap.svg)](http://badge.fury.io/js/redux-bootstrap)
[![Dependencies](https://david-dm.org/remojansen/redux-bootstrap.svg)](https://david-dm.org/remojansen/redux-bootstrap#info=dependencies)
[![img](https://david-dm.org/remojansen/redux-bootstrap/dev-status.svg)](https://david-dm.org/remojansen/redux-bootstrap/#info=devDependencies)
[![img](https://david-dm.org/remojansen/redux-bootstrap/peer-status.svg)](https://david-dm.org/remojansen/redux-bootstrap/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/remojansen/redux-bootstrap/badge.svg)](https://snyk.io/test/github/remojansen/redux-bootstrap)

Bootstrapping for Redux applications.

## Why Do I Need This?
This library handles most of the common application initialization/bootstraping that takes place everytime you create a new Redux project.

When you create a new Redux project you usually need to take care about a few things:

```
- Install dependencies:
  - react 
  - react-dom 
  - redux 
  - react-redux 
  - react-router-redux 
  - immutable 
  - redux-immutable 
  - redux-devtools 
  - redux-devtools-log-monitor 
  - redux-devtools-dock-monitor 
- Create a root reducer
- Integrate the React router with Redux
- Integrate Immutable with Redux
- Enable DevTools is environment is development / Disable if environment is production
- Apply middleware
- Combine reducers into a root reducer
- Create the store
- Sync history with store
- Create the Root component (includes Provider, Router)
- Set the routes, history and store in the Root component
- Render the Root component
```

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
import bootstrap from 'redux-bootstrap';

import routes from "./routes";

// middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// reducers (these are just plane reducers you don't need to invoke combineReducers)
import fooReducer from "./reducers/fooReducer";
import barReducer from "./reducers/barReducer";

bootstrap({
    container: "root",
    routes: routes,
    reducers: {
        fooReducer,
        barReducer,
    },
    middleware: [thunk, createLogger()],
    initialState: Immutable.Map()
});
```

That's it, you are ready to start writing your app!
