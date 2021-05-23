const router = require("express").Router()
const firebase = require('../utils/firebaseapp')
const UserController = require('../Controllers/UserController')

router.get('/logout',(req,res)=>{
    if(!firebase.app.auth().currentUser) return res.status(201).send('vous n\'etes pas connecté')
    UserController.logout(req,res);
})

router.get('/login',(req,res)=>{
    res.render('pages/login')
})
router.get('/home',(req,res)=>{
    if(!firebase.app.auth().currentUser) res.redirect('/login');
    // res.send(firebase.app.auth().currentUser)
    res.render('pages/home')
})
router.post('/login',async (req,res)=>{
    UserController.login({
        email : req.body.email,
        password: req.body.password
    },req,res)
    // console.log('log.js',firebase.app.auth().currentUser)
})

module.exports = router