
const router = require("express").Router()
const { create, read, update, delet } = require("../Controllers/FilesController")
const { formationDocsStorage, uploaddocs } = require("../middleware/multer");


router.get('/',read)
router.get('/:id',read)
router.post('/',formationDocsStorage,uploaddocs.array('docs'),create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router




