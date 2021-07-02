const router = require("express").Router();
const Formation = require("../models/Formation");
const Postuler = require("../models/Postuler");
const User = require("../models/User");
const Partenaire = require("../models/Partenaire");
const firebase = require("../utils/firebaseapp");
const fadmin = require("../utils/firebaseadmin");
const { isAuth } = require("../middleware/Auth");
const { login, logout } = require("../Controllers/UserController");

router.get("/logout", (req, res) => {
	req.session.destroy(() => {
		logout(req, res);
	});
});

router.get("/login", (req, res) => {
	res.render("pages/login", {
		email: req.signedCookies?.email,
		password: req.signedCookies?.password,
	});
});
router.get("/home", isAuth, (req, res) => {
	if (req.session.currentUser._role == "admin") {
		let homeobj = new Object();
		let all = new Array();
		all.push(
			Formation.getAll().then((f) => {
				homeobj.f = f.filter((e) => {
					return (
						new Date(e.date_debut).getMonth() === new Date().getMonth() &&
						new Date(e.date_debut).getFullYear() === new Date().getFullYear()
					);
				});
			})
		);
		all.push(
			Postuler.getAll().then((p) => {
				homeobj.p = p.filter((e) => {
					return e.valider_df == "en attente";
				});
			})
		);
		all.push(
			User.getAll().then((u) => {
				homeobj.u = u;
			})
		);
		all.push(
			Partenaire.getAll().then((par) => {
				homeobj.par = par;
			})
		);
		Promise.all(all).then(() => {
			res.render("pages/admin/home", {
				formation_mois: homeobj.f.length,
				postulationlen: homeobj.p.length,
				userlen: homeobj.u.length,
				parlen: homeobj.par.length,
			});
		});
	} else {
		return res.render("pages/home")
	}
});
router.post("/login", login);

module.exports = router;
