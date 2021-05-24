const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const UserController = require('../Controllers/UserController')


router.get('/me',(req,res)=>{
    console.log(firebase.auth().currentUser)
    if(!firebase.auth().currentUser) req.session.redirecturl = req.originalUrl; res.redirect('\/login')
    res.send('wesh alors')
})






module.exports = router