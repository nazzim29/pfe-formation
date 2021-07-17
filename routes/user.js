const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const {read,create,delet,test,update} = require('../Controllers/UserController')
const multer = require('multer')
const path = require('path')
const {adminOnly} = require('../middleware/Auth')


const patchbody= (req,res,cb)=>{
    const body = JSON.parse(JSON.stringify(req.body).replace('[object HTMLInputElement]','d'))
    req.body = new Object()
    req.body.email = body.d[0]
    req.body.nom = body.d[1]
    req.body.prenom = body.d[2]
    req.body.activite = body.d[3]
    req.body.role = body.d[4]
    cb()
    
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({
    storage,
    fileFilter: (req,file,cb)=>{
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
})

router.get("/", adminOnly,read);
router.post("/", adminOnly,create);
router.get('/photo', test)
router.get('/:id',read)
router.post("/:id", adminOnly,update);
router.delete("/:id", adminOnly,delet);


module.exports = router