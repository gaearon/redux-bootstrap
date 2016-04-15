/// <reference path="../interfaces/interfaces.d.ts" />

let configureStore: (middlewares: Redux.Middleware[], rootReducer: Object, initialState: any) => Redux.Store = null;

if (process.env.NODE_ENV === "production") {
  configureStore = require("./configure_store.prod");
} else {
  configureStore = require("./configure_store.dev");
}

export default configureStore;
