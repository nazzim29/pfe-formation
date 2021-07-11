
const router = require("express").Router()
const {create,read,update,delet,addFile,addForm,deleteFile} = require("../Controllers/SeminaireController")
const { seminaireDocsStorage, uploaddocs } = require("../middleware/multer");
const postulationcontroller = require('../Controllers/SeminairePostulationController')

router.get('/', read)
router.post('/', create)


router.post('/postulation',postulationcontroller.create)
router.get('/postulation', postulationcontroller.read)
router.get("/postulation/:id", postulationcontroller.read);
router.post("/postulation/:id", postulationcontroller.update);
router.delete("/postulation/:id", postulationcontroller.delet);


router.post("/:id/files",seminaireDocsStorage,uploaddocs.any("docs"),addFile);
router.delete("/:id/files/:fichier", deleteFile);


router.post("/:id/formulaire", addForm);
router.get('/:id', read)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router




