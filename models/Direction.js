const Model = require("./model");

module.exports = class Direction extends Model {
	static colref = this.db.collection("departement");
	constructor(id) {
		super();
		this.colref = this.db.collection("departement");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	creat() {
		return this.colref
			.add({
				nom: this.nom,
				directeur: this.directeur,
			})
			.then((doc) => {
				this._id = doc.id;
			})
			.catch((err) => {
				return new Error(err);
			});
	}
	read() {
		return this.docref
			.get()
			.then((doc) => {
				if (doc.exists) {
					let f = doc.data();
					this.nom = f.nom;
					this.directeur = f.directeur;
				} else {
					return new Error("doc introuvable");
				}
			})
			.catch((err) => {
				return new Error(err);
			});
	}
	update() {
		return this.docref
			.set({
				nom: this.nom,
				directeur: this.directeur,
			})
			.catch((err) => {
				return new Error(err);
			});
	}
  delete() {
    return this.docref.delete().catch(err => {
      return new Error(err)
    })
  }
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let direction = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				direction.push(t);
			});
			return direction;
		});
	}
	get nom() {
		return this._nom;
	}
	set nom(value) {
		this._nom = value;
	}
	get directeur() {
		return this._directeur;
	}
	set directeur(value) {
		this._directeur = value;
	}
};
