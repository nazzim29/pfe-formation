const firebase = require("../utils/firebaseapp")
const firebaseadmin = require('../utils/firebaseadmin')
const User = require('../models/User')
exports.create = (req, res) => {
  if (!req.body.email) return res.send('no email provided')
  if (!req.body.password) return res.send('no password provided')
  if (!req.body.nom) return res.send('no nom provided')
  if (!req.body.prenom) return res.send('no prenom provided')
  if (!req.body.role) return res.send('no role provided')
  if (!req.body.activite) return res.send('no activite provided')
  if (!req.body.nom_utilisateur) return res.send('no displayName provided')
  let newUser = new User()
  newUser.nom = req.body.nom
  newUser.prenom = req.body.prenom
  newUser.email = req.body.email
  newUser.password = req.body.password
  newUser.role = req.body.role
  newUser.activite = req.body.activite
  newUser.display_name = req.body.nom_utilisateur
  newUser.create().then((error) => {
    if (error) return res.render("pages/users", {
      error
    })
    res.render("pages/users", {
      success: "utilisateur crée avec succes"
    })
  })

}
exports.delete = (req, res) => {

}
exports.read = (req, res) => {
  console.log(req.query)
  let userid = req.params?.id
  if (userid == req.session.uid && userid !== undefined) return res.redirect('/user/me')
  if (userid == "me") userid = req.session.uid
  if (!userid) {
    console.log('dd')
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
    })
  } else {
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
    }
  })
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed inx


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









exports.logout = (req, res) => {
  function submitAction() {
    var link = document.location.href;
    var searchString = "redirect=";
    var equalIndex = link.indexOf(searchString);
    var redirectUrl = "";

    if (document.forms[0].action == "") {
      var url = window.location.href;
      var args = new Object();
      var query = location.search.substring(1);
      var pairs = query.split("&");
      for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        args[argname] = unescape(value);
      }
      document.forms[0].action = args.switch_url;
    }
    if (equalIndex >= 0) {
      equalIndex += searchString.length;
      redirectUrl = "";
      redirectUrl += link.substring(equalIndex);
    }
    if (redirectUrl.length > 255)
      redirectUrl = redirectUrl.substring(0, 255);
    document.forms[0].redirect_url.value = redirectUrl;
    document.forms[0].buttonClicked.value = 4;
    document.forms[0].submit();
  }


  function change_case() {
    // This function changes username input from upper-case to lower-case
    // If the radius-server used cannot perform this function,
    // the WLC will:
    document.form1.username.value = document.form1.username.value.toLowerCase();
  }

  function loadAction() {
    var url = window.location.href;
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pos == -1) continue;
      var argname = pairs[i].substring(0, pos);
      var value = pairs[i].substring(pos + 1);
      args[argname] = unescape(value);
    }


    document.forms[0].action = args.switch_url;

    // This is the status code returned from webauth login action
    // Any value of status code from 1 to 5 is error condition and user
    // should be shown error as below or modify the message as it suits
    // the customer

    if (args.statusCode == 1) {
      document.location.href = "login.ejs"
    }
    else if (args.statusCode == 2) {
      alert("You are not configured to authenticate against web portal. No further action is required on your part.");
    }
    else if (args.statusCode == 3) {
      alert("The username specified cannot be used at this time. Perhaps the user is already logged into the system?");
    }
    else if (args.statusCode == 4) {
      document.location.href = ""
    }
    else if (args.statusCode == 5) {
      document.location.href = ""
    }
  }
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