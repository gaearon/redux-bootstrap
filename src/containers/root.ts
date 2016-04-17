/// <reference path="../interfaces/interfaces.d.ts" />

import * as React from "react";
import RootProd from "./root.prod";
import RootDev from "./root.dev";

let Root: any = (process.env.NODE_ENV === "production") ? RootProd : RootDev;

export default Root;
