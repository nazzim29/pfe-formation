const Model = require("./model");

module.exports = class Lieu extends Model {
  static colref = this.db.collection("lieutest");
  constructor(id) {
    super();
    this.colref = this.db.collection("lieutest");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  create() {}
  read() {
    return this.docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          let f = doc.data();
          this.nom = f.nom
          // this.titre = f.titre
          // this.type = f.type;
          // this.date_debut = f.date_debut;
          // this.date_fin = f.date_fin;
          // this.activite = f.activite;
          // this.place = f.place;
          // this.lieu = f.lieu;
          // this.formateur = f.formateur;
        } else {
          throw new Error("lieu not found");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  update() {}
  delete() {}
  static getAll() {
    return this.colref.get().then((snapshot) => {
      let lieu = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        lieu.push(t);
      });
      return lieu;
    });
  }
};
