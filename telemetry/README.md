# telemetry

See README.md in the root of this repo for more details.

## quick start

```bash
$ npm install
$ npm start
```

## Testing the service

Start the service, sqllite will automatically setup

```bash
$ npm install
$ npm start
```

POST data to the service and populate data in events table

```bash
$ curl -d '{"event_type":"test"}' -X POST http://localhost:3000
```

GET request to query table and see populated response

```bash
$ curl http://localhost:3000
```
