const Model = require("./model");
const firestore = require("firebase-admin").firestore;

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
  creat(){

  }
  read(){

  }
  update(){

  }
  delete(){

  }
  static getAll(){

  }
  
};
