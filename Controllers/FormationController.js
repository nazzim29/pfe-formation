const Formation = require("../models/Formation");
const Formateur = require("../models/Formateur");
const Lieu = require("../models/Lieu");
const Postuler = require("../models/Postuler");
const Files = require("../models/Files");

exports.create = (req, res) => {
	console.log(req.body);
	if (!req.body.type) return res.send("type manquant");
	if (!req.body.titre) return res.send("titre manquant");
	if (!req.body.description) return res.send("description manquante");
	if (!req.body.date_fin) return res.send("date de fin manquante");
	if (!req.body.date_debut) return res.send("date de debut manquante");
	if (!req.body.activite) return res.send("activite manquante");
	if (!req.body.place) return res.send("nombre de place manquant");
	if (!req.body.lieu) return res.send("lieu manquant");
	if (!req.body.formateur) return res.send("formateur manquant");
	let formation = new Formation();
	formation.type = req.body.type;
	formation.titre = req.body.titre;
	formation.description = req.body.description;
	formation.date_fin = new Date(req.body.date_fin);
	formation.date_debut = new Date(req.body.date_debut);
	formation.activite = req.body.activite;
	formation.place = req.body.place;
	formation.lieu = req.body.lieu;
	formation.formateur = req.body.formateur;
	formation.creat().then((err) => {
		if (err) return res.send(err);
		res.send("ok");
	});
};
exports.deletefile = (req, res) => {
	c = [];
	let formation = new Formation(req.params.id);
	c.push(
		formation.read().then(() => {
			formation.files = formation.files.filter((el) => {
				return el != req.params.fichier;
			});
			formation.update()
		})
	);
	let file = new Files(req.params.fichier);
	c.push(file.delete());
	Promise.all(c).then(() => {
		return res.send('ok')
	})
};
exports.addfile = (req, res) => {
	let formation = new Formation(req.params.id);
	formation.read().then(() => {
		let c = [];
		req.files.forEach((element, index) => {
			let file = new Files();
			file.titre = req.body.titre[index];
			c.push(file.upload(element));
		});
		Promise.all(c).then(([...a]) => {
			d = [];
			req.files.forEach((element, index) => {
				let file = new Files();
				file.titre = req.body.titre[index];
				file.taille = element.size;
				file.downloads = 0;
				file.lien = a[index];
				d.push(
					file.creat().then(() => {
						// if(!formation.files) formation.files = []
						formation.files.push(file._id);
					})
				);
			});
			Promise.all(d).then(() => {
				formation.update().then(() => {
					res.redirect("/formation/" + req.params.id);
				});
			});
		});
	});
};
exports.read = (req, res) => {
	let id = req.params?.id;
	if (req.query.json)
		return Formation.getAll().then((f) => {
			let c = [];
			f.forEach((element) => {
				let lieu = new Lieu(element.lieu);
				c.push(
					lieu.read().then(() => {
						element.lieu = {
							id: lieu._id,
							nom: lieu.nom,
						};
					})
				);
				let formateur = new Formateur(element.formateur);
				c.push(
					formateur.read().then(() => {
						element.formateur = {
							id: formateur._id,
							nom: formateur.nom,
							prenom: formateur.prenom,
						};
					})
				);
				if (req.session.currentUser._role != "admin") {
					let postuler = new Postuler(
						req.session.currentUser._id + "_" + element.id
					);
					c.push(
						postuler.read().then((err) => {
							console.log(err);
							if (!err) element.postuled = true;
						})
					);
				}
			});
			Promise.all(c).then(() => {
				console.log(req.session.currentUser._activite);
				if (req.session.currentUser._role != "admin")
					f = f.filter((o) => {
						return o.activite.includes(req.session.currentUser._activite);
					});
				console.log(f);
				return res.json(f);
			});
		});
	if (!id && req.session.currentUser._role == "admin")
		return res.render("pages/admin/formation");
	if (!id && req.session.currentUser._role != "admin")
		return res.render("pages/formation");
	let formation = new Formation(id);
	return formation.read().then(() => {
		let a = [];
		let files = [];
		formation.files.forEach((el, index) => {
			let file = new Files(el);
			a.push(
				file.read().then(() => {
					files.push(file);
				})
			);
		});
		Promise.all(a).then(() => {
			res.render("pages/formationprofile", { formation, files });
			formation.views++;
			formation.update();
		});
	});
};
exports.update = (req, res) => {
	let formation = new Formation(req.params.id);
	formation.read().then(() => {
		if (req.body.type) formation.type = req.body.type;
		if (req.body.date_fin) formation.date_fin = new Date(req.body.date_fin);
		if (req.body.date_debut)
			formation.date_debut = new Date(req.body.date_debut);
		if (req.body.activite) formation.activite = req.body.activite;
		if (req.body.place) formation.place = req.body.place;
		if (req.body.lieu) formation.lieu = req.body.lieu;
		if (req.body.formateur) formation.formateur = req.body.formateur;
		if (req.body.titre) formation.titre = req.body.titre;
		if (req.body.description) formation.description = req.body.description;
		formation.update().then((err) => {
			if (err) return res.send(err);
			res.send("ok");
		});
	});
};
exports.delet = (req, res) => {
	new Formation(req.params.id).delete().then((err) => {
		if (err) return res.send(err);
		return res.send("ok");
	});
};
