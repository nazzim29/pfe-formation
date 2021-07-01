const router = require('express').Router()

const { getEvents } = require('../Controllers/CalendrierController')



router.get('/', getEvents)

module.exports = router