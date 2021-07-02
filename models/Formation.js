const Model = require("./model");
const firebase = require('firebase')
module.exports = class Formation extends Model {
  static colref = this.db.collection("formationtest");
  constructor(id) {
    super();
    this.colref = this.db.collection("formationtest");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  creat() {
    return this.colref
      .add({
        description:this.description,
        titre:this.titre,
        type: this.type,
        date_debut: this.date_debut,
        date_fin: this.date_fin,
        activite: this.activite,
        place: this.place,
        lieu: this.lieu,
        formateur: this.formateur,
        views: 0,
        files:this.files
      })
      .then((doc) => {
        this._id = doc.id;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  read() {
    return this.docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          let f = doc.data();
          this.description = f.description
          this.titre = f.titre
          this.type = f.type;
          this.date_debut = f.date_debut;
          this.date_fin = f.date_fin;
          this.activite = f.activite;
          this.place = f.place;
          this.lieu = f.lieu;
          this.formateur = f.formateur;
          this.views = f.views;
          this.files = f.files;
        } else {
          return new Error("Formation not found");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  update() {
    return this.colref
			.doc(this._id)
			.set({
				titre: this.titre,
				description: this.description,
				type: this.type,
				date_debut: this.date_debut, //,
				date_fin: this.date_fin,
				activite: this.activite,
				place: this.place,
				lieu: this.lieu,
				formateur: this.formateur,
        views: this.views,
        files: this.files
			})
			.catch((err) => {
				return new Error(err);
			});
  }
  delete() {
    return this.docref.delete().catch((err) => {
      throw new Error(err);
    });
  }
  static getAll() {
    return this.colref.get().then((snapshot) => {
        let formations = [];
        snapshot.forEach((doc) => {
          let t = doc.data()
          t.id = doc.id
          t.date_fin = t.date_fin.toDate()
          t.date_debut = t.date_debut.toDate()
          formations.push(t);
        });
        return formations
      });
  }
  get files() {
    return this._files;
  }
  set files(value) {
    this._files = value;
  }
  get views() {
    return this._views;
  }
  set views(value) {
    this._views = value;
  }
  get titre() {
    return this._titre;
  }
  set titre(value) {
    this._titre = value;
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }
  get date_debut() {

    return this._date_debut;
  }
  set date_debut(value) {
    if(typeof value ==  "Timestamp") return this._date_debut = value.toDate()
    this._date_debut = value;
  }
  get date_fin() {
    return this._date_fin;
  }
  set date_fin(value) {
    if (typeof value == "Timestamp") return (this._date_fin = value.toDate());
    this._date_fin = value;
  }
  get activite() {
    return this._activite;
  }
  set activite(value) {
    this._activite = value;
  }
  get place() {
    return this._place;
  }
  set place(value) {
    this._place = value;
  }
  get lieu() {
    return this._lieu;
  }
  set lieu(value) {
    this._lieu = value;
  }
  get formateur() {
    return this._formateur;
  }
  set formateur(value) {
    this._formateur = value;
  }
};
