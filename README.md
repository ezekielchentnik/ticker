# ticker

Note: if the live version does not display data, it is likely due to rate limits w/IEX Cloud, running locally should do the trick!

Live version: [https://happy-burro.netlify.app](https://happy-burro.netlify.app)

## Install As Desktop Application

To install as an application via Google Chrome Browser follow below steps:

1. Open [https://happy-burro.netlify.app](https://happy-burro.netlify.app) in Chrome 70+
2. Go to Settings (option on top right corner next to address bar)
3. Choose “Install Ticker …” option and done!

These steps will install [https://happy-burro.netlify.app](https://happy-burro.netlify.app) as a desktop application and create a desktop shortcut.

## Running Locally

### Prerequisites

Make sure that latest [Node](https://nodejs.org/en/) is installed.

If you plan on running the project via docker you will need docker and docker-compose

### Instructions

First, clone this repo!

There are two apps in this repo, the ui and telmetry services.  You will need to start each one respectively.

#### UI

To start the ui:

```bash
$ cd ui/
```

Then, install all dependencies:

```bash
$ npm install
```

Finally, to run the project for development:

```bash
$ npm start
```

Or, to run the project for production:

```bash
$ npm run build && npm run serve
```

#### Telemetry

To start telemetry:

```bash
$ cd telemetry/
```

Then, install all dependencies:

```bash
$ npm install
```

Finally, to run the project for production/development:

```bash
$ npm start
```

## Profiling / Performance

Profiling the UI is done using lighthouse, run the following to see report:

```bash
$ cd ui && npm run profile
```

The browser will automatically open with a fresh report 100/100 :)

## Deploying

The live version is deployed via netlify.  Netlify offers free static hosting w/http2.  The telemetry service is not deployed anywhere, it needs to run locally for now.

To deploy the UI to netlify, simply land a PR, netlify will do the rest.

## Features

- [x] fastest build on the market! ~7ms
- [x] deterministic build, dev & prod use exact same build
- [x] minimal dependancy graph for light dev experience, less dependancies, easy to configure
- [x] can be installed on desktop via install button or via chrome settings (see instructions above)
- [x] service worker pre-caches static assets for faster page load (index.html, entry.js, styles.css), and runtime (todo: introduce a cache invalidation strategy)
- [x] static server: gzip, cache-control, brotli
- [x] progressive loading w/ skeleton placeholders
- [x] virtualized lists and data tables
- [x] preact for small bootstrap
- [x] pre-commit hooks for linting and testing
- [x] responsive, looks good on mobile
- [x] progressive web app (PWA), network resilient, fallback experience when offline
- [x] lighthouse score 100/100
- [x] leveraging type checking & linting without the overhead of typescript or eslint (jsdoc, tslint, vscode, prettier)
- [x] containerized via Docker
- [x] nginx static server capable

## Todos / Notes

- [] fix Dockerfile's, docker-compose is not working, related to esbuild
- [] enhance tests (skipped configuring jest, opt for tape, prefer integration test)
- [] introduce target browsers, currently targeting esnext (es2020, chrome, firefox)
- [] add post process css using postcss (add selector nesting, etc.)
- [] enable search params in url bar (sharable urls)
- [] needs cross browser testing, runs great on chrome!
- [] inlining styles, need to use script and inject critical path css
- [] introduce linting/type checking ci and precommit hooks
