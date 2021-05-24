const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const fadmin = require('../utils/firebaseadmin')
const {isAuth} = require('../middleware/Auth')
const UserController = require('../Controllers/UserController')

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.end()
})

router.get('/login',(req,res)=>{
    res.render('pages/login',{
        email: req.signedCookies?.email,
        password: req.signedCookies?.password
    })
})
router.get('/home',isAuth,(req,res)=>{
    res.render('pages/home')
})
router.post('/login',UserController.login)

module.exports = router