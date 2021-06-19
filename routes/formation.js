const router = require("express").Router()
const {create,read,update,delet} = require('../Controllers/FormationController')


router.get('/',read)
router.get('/:id',read)
router.post('/',create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router