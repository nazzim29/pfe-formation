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
})
router.post('/login',(req,res)=>{
    if(firebase.app.auth().currentUser) res.redirect('/home');
    UserController.login({
        email : req.body.email,
        password: req.body.password
    },req,res)
})

module.exports = router