const remove = require('./../../database').remove

module.exports = async (req, res) => {
  res.json(await remove({ _id: req.params.id }))
}
