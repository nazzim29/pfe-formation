const Postuler = require('../models/Postuler')


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

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.delet = (req, res) => {};
