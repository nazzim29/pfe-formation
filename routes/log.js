const router = require("express").Router();
const Formation = require("../models/Formation");
const Postuler = require("../models/Postuler");
const User = require("../models/User");
const Seminaire = require('../models/Seminaire')
const Partenaire = require("../models/Partenaire");
const Cours = require('../models/Cours')
const { isAuth, isNotAuth } = require("../middleware/Auth");
const { login, logout } = require("../Controllers/UserController");

router.get("/logout",isAuth,(req, res) => {
	req.session.destroy(() => {
		logout(req, res);
	});
});

router.get("/login",isNotAuth, (req, res) => {
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
		all.push(
			Seminaire.getAll().then((seminaire) => {
				homeobj.seminaire = seminaire.filter((e) => {
					return (
						new Date(e.date_debut).getMonth() === new Date().getMonth() &&
						new Date(e.date_debut).getFullYear() === new Date().getFullYear()
					);
				})
			})
		)
		all.push(
			Cours.getAll().then((a) => {
				homeobj.cours = a
			})
		)
		return Promise.all(all).then(() => {
			return res.render("pages/admin/home", {
				formation_mois: homeobj.f.length,
				postulationlen: homeobj.p.length,
				userlen: homeobj.u.length,
				parlen: homeobj.par.length,
				seminairelen: homeobj.seminaire.length,
				courlen: homeobj.cours.length,
				topcours: homeobj.cours.sort((a,b)=>b.views-a.views)
			});
		});
	} else {
		c = []
		c.push(Seminaire.getAll())
		c.push(Formation.getAll())
		c.push(Cours.getAll().then(cours=>cours.filter((e)=>e.valider_df == 'accepté'||e.createur == req.session.currentUser._id)))
		Promise.all(c).then(infos => {
			return res.render("pages/home", {
				s: infos[0].length,
				f: infos[1].length,
				c: infos[2].length
			})
			
		})
	}
});
router.post("/login",isNotAuth, login);

module.exports = router;
