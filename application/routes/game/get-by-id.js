const get = require('./../../database').get

module.exports = async (req, res) => {
  res.json(await get({ _id: req.params.id }))
}
