const firebase = require("../utils/firebaseapp")
exports.create = (user,req,res) =>{

}
exports.login = async (req,res) =>{
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        req.session.authToken= idToken
        console.log('redirected to: ', req.session.redirecturl )
        res.redirect(req.session.redirecturl || '\/home');
        req.session.redirecturl = undefined
      });
      req.session.uid = userCredential.user.uid
      req.session.displayname = userCredential.user.displayName
      req.session.photoURL = userCredential.user.photoURL
      req.session.email = userCredential.user.email
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

