
const router = require("express").Router()
const {create,read,update,delet} = require("../Controllers/ProjetController")
const {projetStorage, uploadImage} = require('../middleware/multer')

router.get('/',read)
router.get('/:id',read)
router.post('/',projetStorage,uploadImage.single('photo'),create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router




