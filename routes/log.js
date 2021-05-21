const router = require("express").Router()
const UserController = require('../Controllers/UserController')

router.get('/logout',(req,res)=>{
    if(!req.session.email) return res.status(201).send('vous n\'etes pas connecté')
    UserController.logout(req,res);
})

router.get('/login/haja',(req,res)=>{
    res.render('pages/logintest')
})
router.get('/home',(req,res)=>{
    if (!(req.session.email || firebase.auth.currentUser)) res.status(401).send('Unauthorized')
    res.render("pages/home")
})
router.post('/login',(req,res)=>{
    UserController.login({
        email : req.body.email,
        password: req.body.password
    },req,res)
    //res.redirect("/home")
})

module.exports = router