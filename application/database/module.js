const Datastore = require('nedb')
const games = new Datastore({ filename: `${__dirname}/games.db`, autoload: true })

module.exports = games
