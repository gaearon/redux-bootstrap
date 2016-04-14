import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(middleware, rootReducer, initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}
