const fadmin = require('../utils/firebaseadmin')
exports.isAuth = (req,res,next) => {
    if(!(req.session.authToken)){
        req.session.redirecturl = req.originalUrl
        return res.redirect('\/login')
    }
    fadmin.auth().verifyIdToken(req.session.authToken)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        if(uid) next()
    })
    .catch((error) => {
        req.session.redirecturl = req.originalUrl
        res.redirect("\/login")
    });
}