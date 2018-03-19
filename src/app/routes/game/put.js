const change = require('./../../database').change

module.exports = async (req, res) => {
  res.json(await change({ _id: req.params.id }, req.body))
}
