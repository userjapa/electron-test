module.exports = async (req, res) => {
  res.sendFile(`${__dirname.split('/routes')[0]}/database/games.db`)
}
