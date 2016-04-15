/// <reference path="../interfaces/interfaces.d.ts" />

import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

export default class Root extends React.Component<RootComponentProps, void> {
  public render() {
    const { store, history, routes } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}
