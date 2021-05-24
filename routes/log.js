const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const fadmin = require('../utils/firebaseadmin')
const UserController = require('../Controllers/UserController')

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.end()
})

router.get('/login',(req,res)=>{
    console.log()
    res.render('pages/login',{
        email: req.signedCookies?.email,
        password: req.signedCookies?.password
    })
})
router.get('/home',(req,res)=>{
    if(!(req.session.authToken)){
        req.session.redirecturl = req.url
        return res.redirect('\/login')
    }
    fadmin.auth().verifyIdToken(req.session.authToken)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid)
        res.render('pages/home')
    })
    .catch((error) => {
        req.session.redirecturl = req.url

    });
    // res.send(firebase.app.auth().currentUser)
})
router.post('/login',UserController.login)

module.exports = router