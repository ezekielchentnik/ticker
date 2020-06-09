const sqlite = require('sqlite3');

// make da db
const db = new sqlite.Database('.data/main.db');

// promisify a nice select method
db.select = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.all(sql, values, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
};

module.exports = db;
