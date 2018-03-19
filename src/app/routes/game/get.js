const getAll = require('./../../database').getAll

module.exports = async (req, res) => {
  res.json(await getAll())
}
