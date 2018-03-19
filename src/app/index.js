const express = require('express')

const routes = require('./routes')
const middlewares = require('./middlewares')

const app = express()

middlewares(app)
routes(app)

module.exports = app
