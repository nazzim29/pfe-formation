const firebase = require("../utils/firebaseapp")
exports.create = (user,req,res) =>{
    console.log(firebase.auth.protos)
    firebase.app.auth().createUser(user).then((userRecord) => {
        // Signed in 
        console.log(userRecord)
        res.status(200).send(userRecord)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        // ..
      })
}
exports.login = ({email,password},req,res) =>{
  firebase.app.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    req.session.uid = userCredential.user.uid
    req.session.displayname = userCredential.user.displayName
    req.session.photoURL = userCredential.user.photoURL
    req.session.email = userCredential.user.email
    res.redirect('/home');
    // ...
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
      res.status = 500
    }
  });
}
exports.logout = (req,res)=>{
    req.session.destroy(()=>{
      firebase.auth.signOut().then(()=>{
        res.status(200).send('vous etes deconnecter')
      }).catch((error)=>{
        console.log(error)
      })
  })

}

