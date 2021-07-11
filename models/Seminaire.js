const Model = require("./model");

module.exports = class Seminaire extends Model {
	static colref = this.db.collection("seminairetest");
	constructor(id) {
		super();
		this.colref = this.db.collection("seminairetest");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	creat() {
		return this.colref
			.add({
				titre: this.titre,
				description: this.description,
				activite: this.activite,
				type: this.type,
				place: this.place,
				views: 0,
				files: [],
				formulaire: [],
				lieu: this.lieu,
				animateurs: this.animateurs,
				formulaire: [],
				date_debut: this.date_debut,
				date_fin: this.date_fin,
			})
			.then((doc) => {
				this._id = doc.id;
			});
	}
	read() {
		return this.docref.get().then((doc) => {
			let f = doc.data();
			this._id = doc.id;
			this.titre = f.titre;
			this.description = f.description;
			this.activite = f.activite;
			this.type = f.type;
			this.place = f.place;
			this.views = f.views;
			this.files = f.files;
			this.formulaire = f.formulaire;
			this.lieu = f.lieu;
			this.animateurs = f.animateurs;
			this.formulaire = f.formulaire;
			this.date_debut = f.date_debut;
			this.date_fin = f.date_fin;
		});
	}
	update() {
		return this.docref.set({
			titre: this.titre,
			description: this.description,
			activite: this.activite,
			type: this.type,
			place: this.place,
			views: this.views,
			files: this.files,
			formulaire: this.formulaire,
			lieu: this.lieu,
			animateurs: this.animateurs,
			formulaire: this.formulaire,
			date_debut: this.date_debut,
			date_fin: this.date_fin,
		});
	}
	delete() {
		return this.docref.delete();
	}
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let seminaire = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				t.date_fin = t.date_fin.toDate();
				t.date_debut = t.date_debut.toDate();
				seminaire.push(t);
			});
			return seminaire;
		});
	}
	get date_fin() {
		return this._date_fin;
	}
	set date_fin(value) {
		if (typeof value == "Timestamp") return (this._date_fin = value.toDate());
		this._date_fin = value;
	}
	get date_debut() {
		return this._date_debut;
	}
	set date_debut(value) {
		if (typeof value == "Timestamp") return (this._date_debut = value.toDate());
		this._date_debut = value;
	}
	get formulaire() {
		return this._formulaire;
	}
	set formulaire(value) {
		this._formulaire = value;
	}
	get titre() {
		return this._titre;
	}
	set titre(value) {
		this._titre = value;
	}
	get desription() {
		return this._desription;
	}
	set desription(value) {
		this._desription = value;
	}
	get activite() {
		return this._activite;
	}
	set activite(value) {
		this._activite = value;
	}
	get type() {
		return this._type;
	}
	set type(value) {
		this._type = value;
	}
	get place() {
		return this._place;
	}
	set place(value) {
		this._place = value;
	}
	get views() {
		return this._views;
	}
	set views(value) {
		this._views = value;
	}
	get files() {
		return this._files;
	}
	set files(value) {
		this._files = value;
	}
	get formulaire() {
		return this._formulaire;
	}
	set formulaire(value) {
		this._formulaire = value;
	}
	get lieu() {
		return this._lieu;
	}
	set lieu(value) {
		this._lieu = value;
	}
	get animateurs() {
		return this._animateurs;
	}
	set animateurs(value) {
		this._animateurs = value;
	}
};
