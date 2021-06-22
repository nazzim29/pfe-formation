const Formation = require("../models/Formation");
const Postuler = require("../models/Postuler");
const User = require("../models/User");

exports.create = (req, res) => {
	let postulation = new Postuler(
		req.session.currentUser._id + "_" + req.body.id_formation
	);
	postulation.valider_df = false;
	postulation.valider_superieur = false;
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
				let u = new User(element.id.split("_")[0]);
				c.push(
					u.read().then(() => {
						element.user = {
							id: u._id,
							nom: u.nom,
							prenom: u.prenom,
							activite: u.activite,
							avatar: u.avatar,
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
				return res.json(d);
			});
		});
	} else {
		
		if (!pid) return res.render('pages/admin/postulation')
		if (pid) {
			return res.redirect('\\formation/'+pid.split('_')[1])
		}
	}
};

exports.update = (req, res) => {};

exports.delet = (req, res) => {};
