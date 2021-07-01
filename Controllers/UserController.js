const firebase = require("../utils/firebaseapp");
const firebaseadmin = require("../utils/firebaseadmin");
const User = require("../models/User");
const Direction = require('../models/Direction')
exports.create = (req, res) => {
	if (!req.body.email) return res.send("no email provided");
	if (!req.body.password) return res.send("no password provided");
	if (!req.body.nom) return res.send("no nom provided");
	if (!req.body.prenom) return res.send("no prenom provided");
	if (!req.body.role) return res.send("no role provided");
	if (!req.body.activite) return res.send("no activite provided");
	if (!req.body.username) return res.send("no displayName provided");
	if (!req.body.direction) return res.send("no direction provided");
	let newUser = new User();
	newUser.nom = req.body.nom;
	newUser.prenom = req.body.prenom;
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.role = req.body.role;
	newUser.activite = req.body.activite;
	newUser.direction = req.body.direction;
	newUser.display_name = req.body.nom_utilisateur;
	newUser.create().then((error) => {
		if (error) {
			return res.send(error);
		}
		res.send("ok");
	});
};
exports.update = (req, res) => {
	console.log(req.body)
	let user = new User(req.params?.id);
	user.read().then(() => {
		
		if (req.body.email) user.email = req.body.email;
		if (req.body.password && req.body.password == req.body.confirm_pass)
		user.password = req.body.password;
		if (req.body.nom) user.nom = req.body.nom;
		if (req.body.prenom) user.prenom = req.body.prenom;
		if (req.body.role) user.role = req.body.role;
		if (req.body.activite) user.activite = req.body.activite;
		if (req.body.username) user.display_name = req.body.username;
		if (req.body.direction) user.direction = req.body.direction;
		user
			.update()
			.then(() => {

				res.send("ok");
			})
			.catch((err) => {
				res.send(err);
			});
	});
};
exports.delet = (req, res) => {
	let user = new User(req.params.id);
	user.delete().then((err) => {
		res.send(err);
	});
};
exports.read = (req, res) => {
	let userid = req.params?.id;
	if (userid == req.session.currentUser._id && userid !== undefined)
		return res.redirect("/user/me");
	if (userid == "me") userid = req.session.currentUser._id;
	console.log(userid);
	if (!userid) {
		User.getAll()
			.then((users) => {
				if (req.query.json) {
					let c = []
					users.forEach((el) => {
						if (el.direction) {
							let dir = new Direction(el.direction)
							c.push(dir.read().then(() => {
								el.direction = {
									id: dir._id,
									nom: dir.nom
								}
							}))
						}
					})
					return Promise.all(c).then(() => {
						if (!req.query.draw) return res.json(users);
						let debut = req.query.start;
						let fin = parseInt(req.query.length) + parseInt(debut);
						if (fin > users.length)
							return res.json({
								draw: req.query.draw,
								data: users.slice(debut),
								recordsFiltered: users.slice(debut).length,
								recordsTotal: users.length,
							});
						return res.json({
							draw: req.query.draw,
							data: users.slice(debut, fin),
							recordsFiltered: users.slice(debut, fin).length,
							recordsTotal: users.length,
						});
					})
					
				}
				return res.render("pages/admin/users", {
					users,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		let user = new User(userid);
		user.read().then(() => {
			res.render("pages/profil", {
				user,
			});
		});
	}
};
exports.login = async (req, res) => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			user.getIdToken(true).then((idToken) => {
				req.session.authToken = idToken;
				req.session.currentUser = new User(user.uid);
				req.session.currentUser.read().then(() => {
					let a =
						req.session.redirecturl == "/" ||
						req.session.redirecturl == "/login"
							? null
							: req.session.redirecturl;
					req.session.redirecturl = undefined;
					if (req.body.remember_me) {
						res.cookie("email", req.body.email, { signed: true });
						res.cookie("password", req.body.password, { signed: true });
					} else {
						res.clearCookie("email");
						res.clearCookie("password");
					}
					res.redirect(a || "/home");
				});
			});
		}
	});
	firebase
		.auth()
		.signInWithEmailAndPassword(req.body.email, req.body.password)
		.then((userCredential) => {
			// Signed in
		})
		.catch((error) => {
			console.log("error on login: ", error.code);
			if (error.code === "auth/wrong-password") {
				res.render("pages/login", {
					error: "Mot de passe incorrecte",
					email: req.body.email,
					password: req.body.password,
				});
			} else if (error.code === "auth/user-not-found") {
				res.render("pages/login", {
					error: "Utilisateur introuvable",
					email: req.body.email,
					password: req.body.password,
				});
			} else {
				res.render("pages/login", {
					error: error.code,
					email: req.body.email,
					password: req.body.password,
				});
			}
		});
};
exports.logout = (req, res) => {
	res.redirect("/login");
};

exports.test = (req, res) => {
	var storage = firebase.storage();
	var pathReference = storage.ref("Avatar/default.jpg");
	pathReference
		.getDownloadURL()
		.then((url) => {
			res.send(url);
		})
		.catch((error) => {
			res.send(error);
		});
};
