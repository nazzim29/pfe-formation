const firebase = require("../utils/firebaseapp")
const firebaseadmin = require('../utils/firebaseadmin')
const User = require('../models/User')
exports.create = (req,res) =>{

}
exports.read= (req,res) =>{
  let userid = req.params?.id
  if(userid == req.session.uid) return res.redirect('/user/me')
  if(userid == "me") userid = req.session.uid
  if(!userid){
    User.getAll().then((users)=>{
      res.render('pages/users',{
        users
      })
    })
  }else{
    res.send('un')
  }
}
exports.login = async (req,res) =>{
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        req.session.authToken= idToken
        req.session.redirecturl = undefined
        req.session.uid = user.uid
        req.session.displayname = user.displayName
        req.session.photoURL = user.photoURL
        req.session.email = user.email
        console.log('redirected to: ', req.session.redirecturl )
        res.redirect(req.session.redirecturl || '\/home');
      });
      if(req.body.remember_me){
        res.cookie('email',req.body.email,{signed:true})
        res.cookie('password',req.body.password,{signed:true})
      }else{
        res.clearCookie('email')
        res.clearCookie('password')
      }
    }
  })
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    // Signed in
    
    
  })
  .catch((error) => {
    console.log('error on login: ', error.code)
    if(error.code === 'auth/wrong-password'){
      res.render('pages/login',{
        error: "Mot de passe incorrecte",
        email: req.body.email,
        password: req.body.password
      })
    }else if(error.code === 'auth/user-not-found'){
      res.render('pages/login',{
        error: "Utilisateur introuvable",
        email: req.body.email,
        password: req.body.password
      })
    }else{
      res.send(error.code);
    }
  });
}
exports.logout = (req,res)=>{

}

