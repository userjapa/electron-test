const service = require('./service')

let controller = {}

controller.getAll = async function () {
  let result = {}
  try {
    result.data = await service.find({})
    result.message = 'Got Games Successfully!'
  } catch (error) {
    result.error = error
  }
  return result
}

controller.add = async function (game) {
  let result = {}
  try {
    if (!game) throw new Error('Game to be saved must be informed!')
    result.data = await service.save(game)
    result.message = 'Game Added Successfully!'
  } catch (error) {
    result.error = error
  }
  return result
}

controller.get = async function (game) {
  let result = {}
  try {
    if (!game) throw new Error('Game must be informed!')
    result.data = await service.getOne(game)
    result.message = 'Got Game Successfully!'
  } catch (error) {
    result.error = error
  }
  return result
}

controller.remove = async function (game) {
  let result = {}
  try {
    if (!game) throw new Error('Game to be deleted must be informed!')
    result.data = await service.remove(game)
    result.message = 'Game Deleted Successfully!'
  } catch (error) {
    result.error = error
  }
  return result
}

controller.change = async function (from, to) {
  let result = {}
  try {
    if (!from) throw new Error('Game to be changed must be informed!')
    if (!to) throw new Error('Game thats going to be replaced must be informed!')
    result.data = await service.update(from, to)
    result.message = 'Game Changed Successfully!'
  } catch (error) {
    result.error = error
  }
  return result
}

module.exports = controller
