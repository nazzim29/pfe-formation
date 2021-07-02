
const Model = require("./model");

module.exports = class Files extends Model {
  static colref = this.db.collection("files");
  constructor(id) {
    super();
    this.colref = this.db.collection("files");
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
      let files = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        files.push(t);
      });
      return files;
    });
  }
  
};

