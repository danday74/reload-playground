# Reload Playground

A repo to explore custom live reloads

## Setup

Serve up `index.html` using [http-server](https://www.npmjs.com/package/http-server)

* install web server `npm i -g http-server`

* start web server `http-server -c-1` (execute from project root dir)

THEN execute `npm run watch`

## How it works

[watchpack](https://www.npmjs.com/package/watchpack) monitors for file changes

A websocket (WS) server is started

The WS server informs clients:

* when a file changes
* what type of file was changed - e.g. JS, CSS

If the file type changed was:

* A JS file, the client reloads the entire page
* A CSS file, the client reloads all CSS on the page (without a refresh) - providing a super-fast feedback loop


