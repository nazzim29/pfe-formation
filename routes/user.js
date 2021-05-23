const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const UserController = require('../Controllers/UserController')


router.get('/me',(req,res)=>{
    console.log(firebase.app.auth().currentUser)
    if(!firebase.app.auth().currentUser) req.session.redirecturl = req.originalUrl; res.redirect('\/login')
    res.send('wesh alors')
})






module.exports = router