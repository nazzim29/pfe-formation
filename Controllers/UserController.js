const firebase = require("../utils/firebaseapp")
exports.create = (user,req,res) =>{

}
exports.login = async ({email,password},req,res) =>{
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        console.log('ntm ', idToken)
        res.cookie('authtoken',idToken)
        res.redirect(req.session.redirecturl || '\/home');
        req.session.redirecturl = undefined
      });
    }
  })
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    
    req.session.uid = userCredential.user.uid
    req.session.displayname = userCredential.user.displayName
    req.session.photoURL = userCredential.user.photoURL
    req.session.email = userCredential.user.email
    // // ...
  })
  .catch((error) => {
    if(error.code === 'auth/wrong-password'){
      res.render('pages/login',{
        error: "Mot de passe incorrecte"
      })
    }else if(error.code === 'auth/user-not-found'){
      res.render('pages/login',{
        error: "Utilisateur introuvable"
      })
    }else{
      res.send(error.code);
    }
  });
}
exports.logout = (req,res)=>{

}

