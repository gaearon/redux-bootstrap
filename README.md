# redux-bootstrap
Bootstrapping for Redux applications.

## Why Do I Need This?
This library handles most of the common boilerplate that takes place everytime you create a new Redux project.

When you create a new Redux project you need to take care about a few things:
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
- Create the Root component
- Set the Provider, Router, routes, history and stor in the Root component
- Render the Root component
```
Redux bootrap handles all this stuff for you! 

Install it via npm:
```
npm install --save redux-bootstrap
```
The preceding command will install `redux-bootstrap` and all the depenedencies mention above. Then use the bootstrap function in your application's entry point.
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

## routes.ts
Define your just like in any other Redux application:
```ts
import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'

export default (
  <Route path="/" component={App}>
    <Route path="/:login/:name" component={RepoPage} />
    <Route path="/:login" component={UserPage} />
  </Route>
);
```

### index.html
Don't forget to create a container with the same id that you used in the bootstrap configuration in your `index.html` page:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redux real-world example</title>
  </head>
  <body>
    <div id="root">
    </div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
```
