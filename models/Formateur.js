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
  creat() {}
  read() {}
  update() {}
  delete() {}
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
