const Formation = require("../models/Formation");
const Postuler = require("../models/Postuler");
const User = require("../models/User");
const Direction = require("../models/Direction");

exports.create = (req, res) => {
	let postulation = new Postuler(
		req.session.currentUser._id + "_" + req.body.id_formation
	);
	postulation.valider_df = "en attente";
	postulation.valider_superieur = "en attente";
	postulation.date = new Date();
	postulation
		.creat()
		.then(() => {
			res.send("ok");
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.read = (req, res) => {
	let pid = req.params?.id;
	if (req.query.json) {
		Postuler.getAll().then((d) => {
			let c = new Array();
			d.forEach((element) => {
				element.date = element.date.toDate();
				let u = new User(element.id.split("_")[0]);
				c.push(
					u.read().then(async () => {
						element.user = {
							id: u._id,
							nom: u.nom,
							prenom: u.prenom,
							activite: u.activite,
							avatar: u.avatar,
							direction: u.direction,
						};
						let d = new Direction(element.user.direction);
						await d.read();
						element.user.direction = {
							id: d._id,
							nom: d.nom,
							directeur: d.directeur,
						};
					})
				);
				let f = new Formation(element.id.split("_")[1]);
				c.push(
					f.read().then(async () => {
						element.formation = {
							id: f._id,
							titre: f.titre,
							activite: f.activite,
							type: f.type,
							date_debut: f.date_debut.toDate(),
							date_fin: f.date_fin.toDate(),
							place: f.place,
							participant: await Postuler.validPostulationByFormation(f._id),
						};
					})
				);
			});
			Promise.all(c).then(() => {
				if (req.session.currentUser._role == "directeur") {
					console.log(d)
					d = d.filter((e) => {
						return req.session.currentUser._id === e.user.direction.directeur;
					});
				}
				if (req.session.currentUser._role == "utilisateur") {
					d = d.filter((e) => {
						return e.user.id === req.session.currentUser._id;
					});
				}
				return res.json(d);
			});
		});
	} else {
		if (!pid && req.session.currentUser._role != "utilisateur")
			return res.render("pages/admin/postulation");
		if (!pid && req.session.currentUser._role == "utilisateur")
			return res.render("pages/postulation");
		if (pid) {
			return res.redirect("\\formation/" + pid.split("_")[1]);
		}
	}
};

exports.update = (req, res) => {
	console.log(req.body);
	if (req.body.valider_df == "accepté" || req.body.valider_df == "refusé") {
		console.log("if");
		if (req.session.currentUser._role != "admin")
			return res.status(403).send("non autorisée");
		let postuler = new Postuler(req.params.id);
		postuler.read().then(() => {
			postuler.valider_df = req.body.valider_df;
			postuler.update().then(() => {
				return res.send("ok");
			});
		});
	} else if (
		req.body.valider_superieur == "accepté" ||
		req.body.valider_superieur == "refusé"
	) {
		if (req.session.currentUser._role != "directeur")
			return res.status(403).send("non autorisée");
		let postuler = new Postuler(req.params.id);
		postuler.read().then(() => {
			postuler.valider_superieur = req.body.valider_superieur;
			postuler.update().then(() => {
				return res.send("ok");
			});
		});
	}
};

exports.delet = (req, res) => {
	let id = req.params?.id;
	if (!id) return res.status(404).send("erreur");
	let p = new Postuler(id);
	p.delete().then(() => {
		return res.send("ok");
	});
};
