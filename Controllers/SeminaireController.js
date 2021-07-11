const Seminaire = require("../models/Seminaire");
const Lieu = require("../models/Lieu");
const Animateur = require("../models/Animateur");
const Files = require("../models/SeminaireFiles");
const Postuler = require('../models/SeminairePostuler');
const Formulaire = require('../models/SeminaireFormulaire');
const moment = require('moment')


exports.create = (req, res) => {
	let sem = new Seminaire();
	sem.titre = req.body.titre;
	sem.description = req.body.description;
	sem.type = req.body.type;
	sem.activite = req.body.activite;
	sem.place = req.body.place;
	sem.lieu = req.body.lieu;
	sem.animateurs = req.body.animateurs;
	sem.date_debut = new Date(req.body.date_debut);
	sem.date_fin = new Date(req.body.date_fin);
	return sem.creat().then((e) => {
		return res.send(e || "ok");
	});
};
exports.update = (req, res) => {
	let sem = new Seminaire(req.params.id);
	return sem.read().then(() => {
		if (req.body.titre) sem.titre = req.body.titre;
		if (req.body.description) sem.description = req.body.description;
		if (req.body.type) sem.type = req.body.type;
		if (req.body.activite) sem.activite = req.body.activite;
		if (req.body.place) sem.place = req.body.place;
		if (req.body.lieu) sem.lieu = req.body.lieu;
		if (req.body.animateurs) sem.animateurs = req.body.animateurs;
		if (req.body.date_debut) sem.date_debut = new Date(req.body.date_debut);
		if (req.body.date_fin) sem.date_fin = new Date(req.body.date_fin);
		return sem.update().then((e) => {
			return res.send(e || "ok");
		});
	});
};
exports.read = (req, res) => {
	let id = req.params.id;
	let a  = Array();
	if (req.query.json)
		return Seminaire.getAll().then((s) => {
			s.forEach((seminaire) => {
				seminaire.animateurs.forEach((animateur,index) => {
					let anim = new Animateur(animateur);
					a.push(anim.read().then(() => seminaire.animateurs[index] = anim).catch(e => console.log(e)));
				});
				let l = new Lieu(seminaire.lieu);
				a.push(l.read().then(() => (seminaire.lieu = l)));
			});
			return Promise.all(a).then(() => {
				if (req.session.currentUser._role == "admin") {
					return res.json(s);
				}
				if (req.session.currentUser._role != "admin") {
					let pp = []
					s = s.filter(e => e.activite.includes(req.session.currentUser._activite))
					s.forEach(e => {
						e.postuled = true
						let postulation = new Postuler(req.session.currentUser._id + '_' + e.id)
						pp.push(postulation.read().then(err => {
							if(err) e.postuled = false
						}))
					})
					Promise.all(pp).then(()=> res.json(s))
				}
			});
		});
	if (!id && req.session.currentUser._role == "admin")
		return res.render("pages/admin/seminaire");
	if (!id && req.session.currentUser._role != "admin")
		return res.render("pages/seminaire");
	if (id) {
		let seminaire = new Seminaire(id);
		return seminaire.read().then(() => {
			let a = Array();
			let files = []
			let animateurs = []
			let lieu = new Lieu(seminaire.lieu)
			let postuled = new Postuler(req.session.currentUser._id + "_" + id);
			let reponse = undefined
			seminaire.animateurs.forEach((el, i) => {
				let vv = new Animateur(el)
				a.push(vv.read().then(() => animateurs[i] = vv))
			})
			a.push(lieu.read())
			a.push(
				Formulaire.getAll().then((rows) => {
					reponse = rows.filter(e => id == e.id.split("_")[1])
				})
			)
			a.push(postuled.read().then((err) => {
				if (!err) {
					postuled = {
						accepter: postuled.valider_df && postuled.valider_superieur
					}
				} else {
					postuled = false
				}
			}))
			if(seminaire.files && seminaire.files.length != 0) 
			seminaire.files.forEach((file,i) => {
				let f = new Files(file);
				a.push(f.read().then(() => files[i] = f));
			});
			return Promise.all(a).then(() => {
				console.log(files)
				res.render("pages/seminaireprofil", { seminaire, files, animateurs, lieu, moment, postuled, reponse });
				seminaire.views++
				seminaire.update()
			});
		});
	}
};
exports.delet = (req, res) => {
	let s = new Seminaire(req.params.id);
	s.read().then(() => {
		s.files.forEach((file) => {
			new Files(file).delete();
		});
		s.delete().then(() => {
			res.send("ok");
		});
	});
};
exports.addForm = (req, res) => {
	let seminaire = new Seminaire(req.params.id)
	seminaire.read().then(() => {
		seminaire.formulaire = req.body.questions;
		seminaire.update().then(() => {
			res.send('ok')
		})
	})
}


exports.addFile = (req, res) => {
	console.log(req.files)
	let seminaire = new Seminaire(req.params.id)
	seminaire.read().then(() => {
		let c = []
		req.files.forEach((element) => {
			let file = new Files();
			c.push(file.upload(element))
		})
		Promise.all(c).then(([...a]) => {
			d = []
			req.files.forEach((e, i) => {
				let file = new Files()
				file.titre = req.body.titre[i]
				file.taille = e.size
				file.downloads = 0
				file.lien = a[i]
				d.push(file.creat().then(() => {seminaire.files.push(file._id) }))
			})
			Promise.all(d).then(() => {
				seminaire.update().then(() => {
					res.redirect("/seminaire/"+req.params.id)
				})
			})
		})
	})
}

exports.deleteFile = (req, res) => {
	c = []
	let seminaire = new Seminaire(req.params.id)
	let file= new Files(req.params.fichier)
	c.push(seminaire.read().then(() => {
		seminaire.files = seminaire.files.filter((e) => {
			return e != req.params.fichier;
		})
	}))
	c.push(file.delete())
	return Promise.all(c).then(() => {
		seminaire.update()
		return res.send('ok')
	})

}