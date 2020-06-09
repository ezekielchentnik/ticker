const querystring = require('querystring');
const { json, sendError, createError } = require('micro');
const db = require('./db');

// enable cors!
const { ALLOWED_ORIGIN = '*' } = process.env;
const cors = fn => (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (request.method === 'OPTIONS') {
        return 'ok';
    }

    return fn(request, response);
};

const defaultStart = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString();
};

const defaultEnd = () => new Date().toISOString();

const processEnd = (dateString) => {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

// grab events from db, test using curl http://localhost:3000
const handleGet = async (request) => {
  const {url} = request;
  const q = url.split('?');
  const {
    start = defaultStart(),
    end = defaultEnd(),
    event_type
  } = querystring.parse(q.length > 0 ? q[1] : '');
  const values = {
    $start: new Date(start).toISOString(),
    $end: processEnd(end)
  };
  let eventTypeClause = '';
  if (event_type) {
    values.$event_type = event_type;
    eventTypeClause = `AND event_type = $event_type`;
  }

  // select!
  const events = await db.select(
    `SELECT event_type, date
     FROM events
      WHERE datetime(date) >= datetime($start)
        AND datetime(date) <= datetime($end)
        ${eventTypeClause}`,
    values
  );
  return {events};
};

// handle incoming requests from ui
const handlePost = async (request) => {
  try {
    const data = await json(request);
    const eventType = data.event_type;
    const date = new Date().toISOString();
    db.run(`INSERT INTO events (event_type, date) VALUES (?, ?)`, [
      eventType,
      date
    ]);
    return 'logged';
  } catch {
    return 'noop';
  }
};

// wire everything up
module.exports = cors(async (request, response) => {
    switch (request.method) {
    case 'GET':
        return handleGet(request, response);
    case 'POST':
        return handlePost(request, response);
    default:
        return sendError(
        request,
        response,
        createError(501, 'Not Implemented')
        );
    }
});
