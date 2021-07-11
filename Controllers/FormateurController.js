const Formateur = require("../models/Formateur");

exports.create = (req, res) => {
	let formateur = new Formateur();
	formateur.nom = req.body.nom;
	formateur.prenom = req.body.prenom;
	formateur.etablissement = req.body.etablissement;
	formateur.sexe = req.body.sexe;
	formateur.age = req.body.age;
	formateur.domaine = req.body.domaine;
	formateur.creat().then(() => {
		return res.send("ok");
	});
};
exports.update = (req, res) => {
	let formateur = new Formateur();
	formateur.read().then(() => {
		if(req.body.nom) formateur.nom = req.body.nom;
		if (req.body.prenom) formateur.prenom = req.body.prenom;
		if (req.body.etablissement) formateur.etablissement = req.body.etablissement;
		if (req.body.sexe) formateur.sexe = req.body.sexe;
		if (req.body.age) formateur.age = req.body.age;
		if (req.body.domaine) formateur.domaine = req.body.domaine;
		formateur.update().then(() => {
			return res.send("ok");
		});
	});
};
exports.read = (req, res) => {
	if (req.session.currentUser._role == "admin") {
        if (req.query.json) {
            return Formateur.getAll().then((f) => {
                return res.json(f);
			});
        } else {
            return res.render('pages/admin/formateur')
        }
	}
};
exports.delet = (req, res) => {
    return new Formateur(req.params.id).delete().then(() => {
        return res.send('ok')
    })
};
