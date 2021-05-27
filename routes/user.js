const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const {read,create,test} = require('../Controllers/UserController')


router.get('/photo', test)
router.get('/',read)
router.post('/',create)
router.get('/:id',read)




module.exports = router