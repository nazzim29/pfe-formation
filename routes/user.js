const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const UserController = require('../Controllers/UserController')


router.get('/:id',UserController.read)
router.get('/',UserController.read)





module.exports = router