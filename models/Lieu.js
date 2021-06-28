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
  create() {
    return this.colref.add({
      nom: this.nom
    }).then(doc => {
      this._id  = doc.id
    }).catch(err => {
      return new Error(err)
    })
  }
  read() {
    return this.docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          let f = doc.data();
          this.nom = f.nom
        } else {
          throw new Error("lieu not found");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  update() {
    return this.docref.set({
      nom:this.nom
    }).catch(err => {
      return new Error(err)
    })
  }
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
  get nom() {
    return this._nom;
  }
  set nom(value) {
    this._nom = value;
  }
};
