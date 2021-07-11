
const Model = require("./model");

module.exports = class Projet extends Model {
  static colref = this.db.collection("projet");
  constructor(id) {
    super();
    this.colref = this.db.collection("projet");
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
      let projet = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        projet.push(t);
      });
      return projet;
    });
  }
  
};

