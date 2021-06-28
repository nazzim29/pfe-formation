const Model = require("./model");

module.exports = class Formateur extends Model {
	static colref = this.db.collection("formateurtest");
	constructor(id) {
		super();
		this.colref = this.db.collection("formateurtest");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	creat() {
		return this.colref
			.add({
				nom: this.nom,
				prenom: this.prenom,
				etablissement: this.etablissement,
				age: this.age,
				sexe: this.sexe,
				domaine: this.domaine,
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
					this.prenom = f.prenom;
					this.etablissement = f.etablissement;
					this.age = f.age;
					this.sexe = f.sexe;
					this.domaine = f.domaine;
				} else {
					throw new Error("Partenaire not found");
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	update() {
		return this.docref
			.set({
				nom: this.nom,
				prenom: this.prenom,
				etablissement: this.etablissement,
				age: this.age,
				sexe: this.sexe,
				domaine: this.domaine,
			})
			.catch((err) => {
				return new Error(err);
			});
	}
	delete() {
		return this.docref.delete().catch((err) => {
			return new Error(err);
		});
	}
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let formateur = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				formateur.push(t);
			});
			return formateur;
		});
	}
	get nom() {
		return this._nom;
	}
	set nom(value) {
		this._nom = value;
	}
	get prenom() {
		return this._prenom;
	}
	set prenom(value) {
		this._prenom = value;
	}
	get etablissement() {
		return this._etablissement;
	}
	set etablissement(value) {
		this._etablissement = value;
	}
	get sexe() {
		return this._sexe;
	}
	set sexe(value) {
		this._sexe = value;
	}
	get age() {
		return this._age;
	}
	set age(value) {
		this._age = value;
	}
	get domaine() {
		return this._domaine;
	}
	set domaine(value) {
		this._domaine = value;
	}
};
