const firebase = require("../utils/firebaseapp")
exports.create = (user,req,res) =>{
    console.log(firebase.auth.protos)
    firebase.auth.createUser(user).then((userRecord) => {
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
  firebase.auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(userCredential));
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage)
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

