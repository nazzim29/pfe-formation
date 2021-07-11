
const router = require("express").Router()
const {create,read,update,delet} = require("../Controllers/FormulaireController")


router.get('/',read)
router.get('/:id',read)
router.post('/:id', create);
router.delete('/:id', delet)

module.exports = router




