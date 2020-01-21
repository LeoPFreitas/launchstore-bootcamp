const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "Cadu2012",
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})