const firebase = require("../utils/firebaseapp")
const firebaseadmin = require('../utils/firebaseadmin')
const User = require('../models/User')
<<<<<<< HEAD
exports.create = (req,res) =>{
  if(!req.body.email) return res.send('no email provided')
  if(!req.body.password) return res.send('no password provided')
  if(!req.body.nom) return res.send('no nom provided')
  if(!req.body.prenom) return res.send('no prenom provided')
  if(!req.body.role) return res.send('no role provided')
  if(!req.body.activite) return res.send('no activite provided')
  if(!req.body.username) return res.send('no displayName provided')
=======
exports.create = (req, res) => {
  console.log(req.body)
  if (!req.body.email) return res.send('no email provided')
  if (!req.body.password) return res.send('no password provided')
  if (!req.body.nom) return res.send('no nom provided')
  if (!req.body.prenom) return res.send('no prenom provided')
  if (!req.body.role) return res.send('no role provided')
  if (!req.body.activite) return res.send('no activite provided')
  if (!req.body.username) return res.send('no displayName provided')
>>>>>>> befcd787dffad3d4d4fa92fabdd99be0a979fd11
  let newUser = new User()
  newUser.nom = req.body.nom
  newUser.prenom = req.body.prenom
  newUser.email = req.body.email
  newUser.password = req.body.password
  newUser.role = req.body.role
  newUser.activite = req.body.activite
  newUser.display_name = req.body.nom_utilisateur
  newUser.create().then((error) => {
    if (error) {
      return res.send(error)
    }
    res.send('ok')
  })

}
<<<<<<< HEAD
exports.update = ((req,res)=>{
  let user = new User(req.params?.id)
  if(req.body.email) user.email = req.body.email
  if(req.body.password && req.body.password == req.body.confirm_pass) user.password = req.body.password
  if(req.body.nom) user.name = req.body.nom
  if(req.body.prenom) user.prenom = req.body.prenom
  if(req.body.role) user.role = req.body.role
  if(req.body.activite) user.ectivite = req.body.activite
  if(req.body.username) user.display_name = req.body.username
  user.update().then(((p)=>{
    res.send('ok')
  })).catch((err)=>{
    res.send(err)
  })
})
exports.delet = (req,res) =>{
  let user = new User(req.params.id)
  user.delete().then((err)=>{
    res.send(err)
  })
=======
exports.update = ((req, res) => {
  let user = new User()
  user.id = req.params?.id
  if (req.body.email) return res.send('no email provided')
  if (!req.body.password) return res.send('no password provided')
  if (!req.body.nom) return res.send('no nom provided')
  if (!req.body.prenom) return res.send('no prenom provided')
  if (!req.body.role) return res.send('no role provided')
  if (!req.body.activite) return res.send('no activite provided')
  if (!req.body.username) return res.send('no displayName provided')
})
exports.delete = (req, res) => {

>>>>>>> befcd787dffad3d4d4fa92fabdd99be0a979fd11
}
exports.read = (req, res) => {
  let userid = req.params?.id
  if (userid == req.session.uid && userid !== undefined) return res.redirect('/user/me')
  if (userid == "me") userid = req.session.uid
  if (!userid) {
    User.getAll().then((users) => {
      if (req.query.json) {
        if (!req.query.draw) return res.json(users)
        let debut = req.query.start
        let fin = parseInt(req.query.length) + parseInt(debut)
        if (fin > users.length) return res.json({ "draw": req.query.draw, "data": users.slice(debut), "recordsFiltered": users.slice(debut).length, "recordsTotal": users.length })
        return res.json({ "draw": req.query.draw, "data": users.slice(debut, fin), "recordsFiltered": users.slice(debut, fin).length, "recordsTotal": users.length })
      }
      res.render('pages/users', {
        users
      })
<<<<<<< HEAD
    }).catch((err)=>{console.log(err)})
  }else{
=======
    })
  } else {
>>>>>>> befcd787dffad3d4d4fa92fabdd99be0a979fd11
    let user = new User(userid)
    user.read().then(() => {
      res.render("pages/profil", {
        user
      })
    })
  }
}
exports.login = async (req, res) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(true).then(idToken => {
<<<<<<< HEAD
        req.session.authToken= idToken
        req.session.currentUser = new User(user.uid)
        req.session.currentUser.read().then(()=>{
          let a = req.session.redirecturl 
          req.session.redirecturl = undefined
          res.redirect(a || '\/home');
        })
        if(req.body.remember_me){
          res.cookie('email',req.body.email,{signed:true})
          res.cookie('password',req.body.password,{signed:true})
        }else{
          res.clearCookie('email')
          res.clearCookie('password')
        }
      });
=======
        req.session.authToken = idToken
        req.session.redirecturl = undefined
        req.session.uid = user.uid
        req.session.displayname = user.displayName
        req.session.photoURL = user.photoURL
        req.session.email = user.email
        console.log('redirected to: ', req.session.redirecturl)
        res.redirect(req.session.redirecturl || '\/home');
      });
      if (req.body.remember_me) {
        res.cookie('email', req.body.email, { signed: true })
        res.cookie('password', req.body.password, { signed: true })
      } else {
        res.clearCookie('email')
        res.clearCookie('password')
      }
>>>>>>> befcd787dffad3d4d4fa92fabdd99be0a979fd11
    }
  })
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in


    })
    .catch((error) => {
      console.log('error on login: ', error.code)
      if (error.code === 'auth/wrong-password') {
        res.render('pages/login', {
          error: "Mot de passe incorrecte",
          email: req.body.email,
          password: req.body.password
        })
      } else if (error.code === 'auth/user-not-found') {
        res.render('pages/login', {
          error: "Utilisateur introuvable",
          email: req.body.email,
          password: req.body.password
        })
      } else {
        res.send(error.code);
      }
    });
}
<<<<<<< HEAD
exports.logout = (req,res)=>{
  res.redirect('/login')
=======
exports.logout = (req, res) => {
>>>>>>> befcd787dffad3d4d4fa92fabdd99be0a979fd11
}

exports.test = (req, res) => {
  var storage = firebase.storage();
  var pathReference = storage.ref('Avatar/default.jpg');
  pathReference.getDownloadURL().then(url => {
    res.send(url)
  }).catch(error => {
    res.send(error)
  })
}