const formidable = require('formidable')
const fs = require('fs')
const NeDB = require('nedb')

module.exports = async (req, res) => {
  // Initialize Form
  var form = new formidable.IncomingForm();
  const dir = `${__dirname.split('/routes')[0]}/database/`
  // Parsing Form
  form.parse(req, function (err, fields, files) {
    const oldpath = files.database.path
    const newpath = dir + files.database.name
    // Saving DataBase
    fs.rename(oldpath, newpath, async (err) => {
      if (err) {
        res.send(err);
      } else {
        try {
          const gameController = require('./../../database')
          // Getting Games
          const { data } = await gameController.getAll()
          const games = data.slice()
          console.log('Got Games: ', games)
          // Opennin Imported Database
          const importedDB = new NeDB({ filename: newpath, autoload: true })
          // Getting Games from Imported DB
          importedDB.find({}, async (err, docs) => {
            if (err) {
              res.send(err)
            } else {
              console.log('Got Docs: ', docs)
              // Checking Imported DB
              for (let game of docs) {
                const index = games.findIndex(x => x['_id'] === game['_id'])
                if (index > -1) {
                  await gameController.change( { _id: games[index]['_id'] }, game)
                  console.log(`Changed ${game['_id']}`)
                } else {
                  await gameController.add(game)
                  console.log(`Added ${game['_id']}`)
                }
              }
              // Checking Games
              for (let game of games) {
                const index = docs.findIndex(x => x['_id'] === game['_id'])
                if (index === -1) {
                  await gameController.remove({ _id: game['_id'] })
                  console.log(`Removed ${game['_id']}`)
                }
              }
              fs.unlink(newpath, err => {
                if (err) res.send(err)
              })
              res.send('Imported!')
            }
          })
        } catch (error) {
          res.send(error)
        }
      }
    })
  })
}
