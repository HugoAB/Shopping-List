const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "19602000",
    host: "localhost",
    port: "5432",
    database: "shopping-list"
});

module.exports = pool;