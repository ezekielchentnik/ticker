const db = require('./db');

// create a nice table
const tables = `CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  date STRING NOT NULL,
  event_type STRING NOT NULL
);`;

db.run(tables);
