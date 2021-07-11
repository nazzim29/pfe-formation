const router = require("express").Router()
const { create, read, update, delet, addfile,deletefile,addForm } = require('../Controllers/FormationController')
const { formationDocsStorage, uploaddocs } = require("../middleware/multer");


router.get('/', read)
router.post('/:id/files', formationDocsStorage, uploaddocs.any('docs'), addfile)
router.post('/:id/formulaire',addForm)
router.delete('/:id/files/:fichier',deletefile)
router.get('/:id',read)
router.post('/',create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router