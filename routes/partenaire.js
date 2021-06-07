const router = require("express").Router()
const {create,read,update,delet} = require('../Controllers/PartenaireController')
const {partenaireLogoStorage,uploadImage,patchbody} = require('../middleware/multer')



router.get('/',read)
router.get('/:id',read)
router.post('/',partenaireLogoStorage,uploadImage.single('logo'),create)
router.post('/:id',partenaireLogoStorage,uploadImage.single('logo'),update)
router.delete('/:id',delet)





module.exports = router