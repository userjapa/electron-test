module.exports = app => {
  app.use('/', require('./main'))
  app.use('/game', require('./game'))
  app.use('/database', require('./database'))
}
