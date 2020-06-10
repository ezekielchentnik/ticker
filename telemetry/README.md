# telemetry

See README.md in the root of this repo for more details.

## quick start

```bash
$ npm install
$ npm start
```

## Testing the service

Start the service (sqllite will automatically be setup):

```bash
$ npm install
$ npm start
```

POST data to the service and populate data in events table:

```bash
$ curl -d '{"event_type":"test"}' -X POST http://localhost:3000
```

GET request to query table and see populated response:

```bash
$ curl http://localhost:3000
```

You can also post differant event_types and query for them:

```bash
$ curl -d '{"event_type":"my_custom_event"}' -X POST http://localhost:3000
$ curl http://localhost:3000?event_type=my_custom_event
```

## Usage from a UI

POST via fetch:

```js
const track = event_type => {
    return fetch(
        'http://localhost:3000',
        {
            method: 'POST',
            headers: new Headers({ Authorization: 'jimbo' }),
            body: JSON.stringify({ event_type })
        }
    )
};

track('page_loaded');
```
