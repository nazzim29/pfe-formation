const multer = require('multer')
const path = require('path')

exports.avatarStorage = (req,res,cb)=>{
    req.filedestination = 'uploads/Avatar'
    cb()
}
exports.partenaireLogoStorage = (req,res,cb)=>{
    req.filedestination = 'uploads/logoPartenaire'
    cb()
}
exports.formationDocsStorage = (req,res,cb)=>{
    req.filedestination = 'uploads/formationdocs'
    cb()
}



exports.uploadImage = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, req.filedestination);
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {

            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: (req,file,cb)=>{
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
})
exports.uploaddocs = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, req.filedestination);
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {

            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
})

exports.patchbody= (req,res,cb)=>{
    const body = JSON.parse(JSON.stringify(req.body).replace('[object HTMLInputElement]','d'))
    console.log(req.body)
    req.body = new Object()
    req.body.email = body.d[0]
    req.body.nom = body.d[1]
    req.body.prenom = body.d[2]
    req.body.activite = body.d[3]
    req.body.role = body.d[4]
    cb()
    
}