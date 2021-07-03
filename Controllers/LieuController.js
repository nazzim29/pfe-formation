const Lieu = require("../models/Lieu");

exports.create = (req, res) => {
	let lieu = new Lieu();
	lieu.nom = req.body.nom;
	lieu.create().then(() => {
		res.send("ok");
	});
};
exports.update = (req, res) => {
	let lieu = new Lieu();
	return lieu.read().then(() => {
		lieu.nom = req.body.nom;
		lieu.create().then(() => {
			res.send("ok");
		});
	});
};
exports.read = (req, res) => {
	if (req.session.currentUser._role == "admin") {
        if (req.query.json) {
            return Lieu.getAll().then((f) => {
                return res.json(f);
			});
        } else {
            return res.render('pages/admin/lieu')
        }
    }
};
exports.delet = (req, res) => {
    return new Lieu(req.params.id).delete().then(() => {
        res.send('ok')
    })
};
