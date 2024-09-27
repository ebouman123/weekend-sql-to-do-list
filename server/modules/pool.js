const pg = require("pg");

let pool;


// Conditional - if there is no cloud database we will run the local database
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "weekend-to-do-app",
    allowExitOnIdle: true,
  });
}


module.exports = pool;
