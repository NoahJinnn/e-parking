const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: __dirname + '/kiosk-desktop.db',
  },
  useNullAsDefault: true,
  log: {
    warn (message) {
      console.warn(message)
    },
    error (message) {
      console.error(message)
    },
  },
})

db.raw("SELECT 'test connection';")
  .then(() => {
    console.info('Successfully connect SQLite DB!')
  })
  .catch((err) => {
    // Failure / timeout
    throw err
  })

module.exports.db = db
