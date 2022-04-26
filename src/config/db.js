const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'web2',
  password: 'password',
  port: 5432,
})

module.exports = pool
