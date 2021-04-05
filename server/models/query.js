const { Pool } = require('pg');

const PG_URI =
  'postgres://''@queenie.db.elephantsql.com:5432/zdkkkscr';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
