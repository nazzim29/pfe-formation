
const router = require("express").Router()
const {create,getedit,read,update,delet,deletevideo,addfile,deletefile, addcomment,like, deletecomment,validation} = require("../Controllers/CoursController")
const Cours = require("../models/Cours")
const {
	coursStorage,
	uploaddocs,
} = require("../middleware/multer");


router.get('/', read)
router.get('/add',(req,res)=>res.render('pages/coursadd'))
router.get('/edit/:id', getedit)
router.get('/:id/like',like)
router.get('/:id/comment/:index', deletecomment)
router.get('/:id',read)
router.post('/', coursStorage, uploaddocs.any('docs'), create)
router.post('/:id/validation',validation)
router.post('/:id/comment', addcomment)
router.post('/:id/file',coursStorage, uploaddocs.any('docs'),addfile)
router.post('/:id',coursStorage,uploaddocs.any('docs'),update)
router.delete('/:id/video', deletevideo)
router.delete('/:id/files/:index',deletefile)
router.delete('/:id', delet)

module.exports = router




