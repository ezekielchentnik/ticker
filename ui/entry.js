// Libraries
import { h, render } from "preact";

// Components
import { App } from "./App.jsx";
import { AppState } from "./AppState.js";

// note: keeping things simple, there are other ways to track, e.g. sendBeacon & beforeunload, img pixels, etc.
// note: check and see if we tracked event and stored in db using: curl http://localhost:3000
const track = event_type => {
    // until the telemetry api is deployed, just punt
    if(location.hostname.includes("netlify")){
        return;
    }
    return fetch(
        'http://localhost:3000',
        {
            method: 'POST',
            headers: new Headers({ Authorization: 'jimbo' }),
            body: JSON.stringify({ event_type })
        }
    )
};

render(h(AppState, null, [App]), document.getElementById("app-root"));

// cheers!

track('page_loaded');

// note: this is to illustrate how to send Telemetry using sendBeacon, although we need to adjust the api to recieve blobs
// const telemetry = JSON.stringify({ url: document.URL, ua: navigator.userAgent, ...window.performance.timing });
// const blob = new Blob([telemetry], { type: 'application/json' });
// navigator.sendBeacon('http://localhost:3000/', blob);