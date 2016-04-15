/// <reference path="../interfaces/interfaces.d.ts" />

import * as React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

let DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w">
        <LogMonitor />
    </DockMonitor>
);

export default DevTools;
