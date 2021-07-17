const Cours = require("../models/Cours");
const User = require("../models/User");
const moment = require("moment");

exports.create = (req, res) => {
	console.log(req.body);
	req.video = req.files.filter((e) => e.fieldname == "video");
	req.files = req.files.filter((e) => e.fieldname != "video");
	let cour = new Cours();
	cour.titre = req.body.titre;
	cour.description = req.body.description;
	cour.signature = req.body.signature;
	cour.keywords = req.body.keywords || [];
	cour.createur = req.session.currentUser._id;
	cour.date_creation = new Date();
	cour.date_modification = new Date();
	cour.views = 0;
	cour.like = [];
	cour.comments = new Array();
	cour.files = [];
	cour.valider_df = req.session.currentUser._role == "admin" ? true : false;
	a = [];
	if (req.files) {
		c = [];
		req.files.forEach((e) => {
			c.push(cour.upload(e));
		});
		a.push(
			Promise.all(c).then(([...a]) => {
				a.forEach((e, i) => {
					cour.files[i] = {
						titre: req.body.filetitle[i],
						link: e,
						taille: req.files[i].size,
					};
				});
			})
		);
	}
	if (req.video && req.video.length != 0) {
		a.push(
			cour.upload(req.video[0]).then((url) => {
				cour.video = url;
			})
		);
	}
	Promise.all(a).then(() => {
		cour.creat().then(() => {
			res.send("ok");
		});
	});
};
exports.update = (req, res) => {
	const id = req.params.id;
	let cour = new Cours(id);
	cour.read().then(() => {
		if (req.session.currentUser._id != cour.createur)
			return res.statut(403).send("non autorisé");
		cour.titre = req.body.titre || cour.titre;
		cour.description = req.body.description || cour.description;
		cour.signature = req.body.signature || cour.signature;
		cour.keywords = req.body.keywords || cour.keywords;
		cour.date_modification = new Date();
		if (req.files) {
			return cour.upload(req.files[0]).then((url) => {
				cour.video = url;
				cour.update().then(()=>res.redirect('/cours'))
			});
		}
		cour.update().then(()=>res.redirect('/cours'))
	});
};
exports.read = (req, res) => {
	const id = req.params?.id;
	if (req.query.json) {
		return Cours.getAll().then((cours) => {
			let c = [];
			if (req.session.currentUser._role != "admin")
				cours = cours.filter((e) => e.valider_df == "accepté" || e.createur == req.session.currentUser._id);
			cours.forEach((e) => {
				if(req.session.currentUser._id == e.createur) e.isowner = true
				let user = new User(e.createur);
				c.push(
					user.read().then(() => {
						e.createur = user;
					})
				);
				if (e.comments && e.comments.length != 0)
					e?.comments.forEach((a) => {
						let u = new User(a.user);
						c.push(
							u.read().then(() => {
								a.user = u;
							})
						);
					});
				if (e.like && e.like.length != 0)
					e.like.forEach((a) => {
						let u = new User(a);
						c.push(
							u.read().then(() => {
								a.user = u;
							})
						);
					});
			});
			return Promise.all(c).then(() => {
				return res.json(cours);
			});
		});
	} else {
		if (id) {
			let cour = new Cours(id);
			return cour.read().then(() => {
				cour.views++
				cour.update()
				let c = [];
				let createur = new User(cour.createur);
				c.push(
					createur.read().then(() => {
						cour.createur = createur;
					})
				);
				cour.comments.forEach((comment) => {
					let user = new User(comment.user);
					c.push(
						user.read().then(() => {
							comment.user = user;
						})
					);
				});
				Promise.all(c).then(() => {
					return res.render("pages/coursprofile", { cour, moment });
				});
			});
		}
		if (req.session.currentUser._role == "admin")
			return res.render("pages/admin/cours");
		if (req.session.currentUser._role != "admin")
			return res.render("pages/cours");
	}
};

exports.getedit = (req, res) => {
	let cour = new Cours(req.params.id);
	cour.read().then(() => {
		let a = [];
		let u = new User(cour.createur);	
		a.push(
			u.read().then(() => {
				cour.createur = u;
			})
		);

		Promise.all(a).then(() => res.render("pages/coursedit", { cour, moment }));
	});
};


exports.delet = (req, res) => {};
exports.deletevideo = (req, res) => {
	const id = req.params.id
	let cour = new Cours(id)
	cour.read().then(() => {
		cour.video = undefined
		cour.date_modification =new Date()
		cour.update().then(()=>res.send('ok'))
	})
};
exports.addfile = (req, res) => {
	const id = req.params.id
	let cour = new Cours(id)
	let c = []
	c.push(
		cour.read()
	)
	req.files.forEach((file) => {
		c.push(cour.upload(file))
	})
	Promise.all(c).then(([...urls]) => {
		urls.forEach((el, i) => {
			if (i != 0) {
				cour.files.push({
					taille: req.files[i - 1].size,
					link: el,
					titre:req.body.filetitle[i-1]
				})
			}
		})
		cour.date_modification = new Date()
		cour.update().then(()=>res.redirect('/cours/edit/'+id))
	})
}

exports.deletefile = (req, res) => {
	const id = req.params.id
	const index = req.params.index
	let cour = new Cours(id)
	cour.read().then(() => {
		cour.files[index] = undefined
		cour.date_modification = new Date()
		cour.update().then(()=>res.redirect('/cours/edit/'+id))
	})
}

exports.addcomment = (req, res) => {
	const id = req.params.id
	let cour = new Cours(id)
	cour.read().then(() => {
		cour.comments.push({
			user: req.session.currentUser._id,
			date: new Date(),
			content: req.body.comment
		})
		cour.update().then(()=>res.redirect('/cours/'+id))
	})
}
exports.like = (req, res) => {
	const id = req.params.id
	let cour = new Cours(id)
	cour.read().then(() => {
		if (cour.like.includes(req.session.currentUser._id)) cour.like = cour.like.filter(e => e != req.session.currentUser._id)
		else cour.like.push(req.session.currentUser._id)
		cour.update().then(()=>res.send('ok'))
	})
}


exports.deletecomment = (req, res) => {
	const id = req.params.id
	const index = req.params.index
	let cour = new Cours(id)
	cour.read().then(() => {
		if (cour.comments[index].user == req.session.currentUser._id)
			cour.comments[index] = undefined
		cour.update().then(() => {
			res.redirect('/cours/'+id)
		})
	})
}
exports.validation = (req, res) => {
	if (req.session.currentUser._role != 'admin') return res.statut(403).send('non autorisé')
	const id = req.params.id
	let cour = new Cours(id)
	cour.read().then(() => {
		cour.valider_df = req.body.validation ? 'accepté' : 'refusé'
		cour.update().then('ok')
	})
}