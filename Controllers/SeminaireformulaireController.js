const Formulaire = require("../models/Seminaireformulaire");

exports.create = (req, res) => {
	let formulaire = new Formulaire(
		req.session.currentUser._id + "_" + req.params.id
	);
	formulaire.reponses = req.body.reponses;
	formulaire.creat().then(() => {
		res.send("ok");
	});
};
exports.update = (req, res) => {};
exports.read = (req, res) => {};
exports.delet = (req, res) => {};
