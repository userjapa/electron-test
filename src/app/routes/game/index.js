const express = require('express')
const router = express.Router()

router.get('/', require('./get'))
router.post('/', require('./post'))
router.get('/:id', require('./get-by-id'))
router.delete('/:id', require('./remove'))
router.put('/:id', require('./put'))

module.exports = router
