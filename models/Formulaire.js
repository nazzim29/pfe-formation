const Model = require("./model");

module.exports = class Formulaire extends Model {
	static colref = this.db.collection("formulairetest");
	constructor(id) {
		super();
		this.colref = this.db.collection("formulairetest");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	creat() {
		return this.docref
			.set({
				reponses: this.reponses,
			})
			.then((doc) => (this._id = doc.id))
			.catch((e) => {
				return new Error(e);
			});
	}
	read() {
		return this.docref
			.get()
			.then((doc) => {
				if (doc.exists) {
					let f = doc.data();
					this.reponses = f.reponses;
				} else {
					return new Error("l'utilisateur n'as pas repondu");
				}
			})
			.catch((err) => {
				return new Error(err);
			});
	}
	update() {}
	delete() {}
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let formulaire = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				formulaire.push(t);
			});
			return formulaire;
		});
	}
};
