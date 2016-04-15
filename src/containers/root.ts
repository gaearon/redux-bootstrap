/// <reference path="../interfaces/interfaces.d.ts" />

import * as React from "react";

let Root: React.Component<RootComponentProps, void> = null;

if (process.env.NODE_ENV === "production") {
  Root = require("./root.prod");
} else {
  Root = require("./root.dev");
}

export default Root;
