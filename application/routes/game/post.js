const add = require('./../../database').add

module.exports = async (req, res) => {
  res.json(await add(req.body))
}
