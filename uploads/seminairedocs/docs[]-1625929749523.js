
const Model = require("./model");

module.exports = class Animateur extends Model {
  static colref = this.db.collection("animateur");
  constructor(id) {
    super();
    this.colref = this.db.collection("animateur");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  creat() {
    return this.colref.add({
      nom : this.nom,
      prenom:this.prenom,
      domaine:this.domaine,
      age:this.age,
      sexe:this.sexe
    }).then((doc) => {
      this._id = doc.id
    }).catch((e) => { return e })
  }
  read() {
    return this.docref.get().then((doc) => {
      let f = doc.data()
      this.nom =  f.nom,
      this.prenom= f.prenom,
      this.domaine= f.domaine,
      this.age= f.age,
      this.sexe= f.sexe
    })
  }
  update() {
    return this.docref.set({
			nom: this.nom,
			prenom: this.prenom,
			domaine: this.domaine,
			age: this.age,
			sexe: this.sexe,
		});
  }
  delete() {
    return this.docref.delete()
  }
  static getAll() {
    return this.colref.get().then((snapshot) => {
      let animateur = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        animateur.push(t);
      });
      return animateur;
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
  
  get domaine() {
    return this._domaine;
  }
  set domaine(value) {
    this._domaine = value;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
  get sexe() {
    return this._sexe;
  }
  set sexe(value) {
    this._sexe = value;
  }
};

