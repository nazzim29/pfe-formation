
const Model = require("./model");

module.exports = class Projet extends Model {
  static colref = this.db.collection("projettest");
  constructor(id) {
    super();
    this.colref = this.db.collection("projettest");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  creat() {
    return this.colref.add({
      titre: this.titre,
      description: this.description,
      photo:this.photo
    }).then((doc) => {
      this._id = doc.id
    })
  }
  read() {
    return this.docref.get().then((doc)=>{
      let f = doc.data()
      this.titre = f.titre
      this.description = f.description
      this.photo = f.photo
    })
  }
  update() {
    return this.docref.set({
			titre: this.titre,
			description: this.description,
			photo: this.photo,
		});
  }
  delete() {
    return this.docref.delete()
  }
  static getAll() {
    return this.colref.get().then((snapshot) => {
      let projet = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        projet.push(t);
      });
      return projet;
    });
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
  get photo() {
    return this._photo;
  }
  set photo(value) {
    this._photo = value;
  }
};

