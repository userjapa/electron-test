const games = require('./module')

let service = {}

service.find = (search) => {
  return new Promise((resolve, reject) => {
    games.find(search).sort({ date: -1 }).exec((err, docs) => {
      if (err) reject(err)
      else resolve(docs)
    })
  })
}

service.save = (game) => {
  return new Promise((resolve, reject) => {
    games.insert(game, (err, doc) => {
      if (err) reject(err)
      else resolve(doc)
    })
  })
}

service.getOne = (game) => {
  return new Promise((resolve, reject) => {
    games.findOne(game, (err, doc) => {
      if (err) reject(err)
      else resolve(doc)
    })
  })
}

service.remove = (game) => {
  return new Promise((resolve, reject) => {
    games.remove(game, (err, n_deleted) => {
      if (err) reject(err)
      else resolve(n_deleted)
    })
  })
}

service.update = (query, game) => {
  return new Promise((resolve, reject) => {
    games.update(query, game, {}, (err, n_updated) => {
      if (err) reject(err)
      else resolve(n_updated)
    })
  })
}

module.exports = service
