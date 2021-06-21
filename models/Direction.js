
const Model = require("./model");

module.exports = class Direction extends Model {
  static colref = this.db.collection("direction");
  constructor(id) {
    super();
    this.colref = this.db.collection("direction");
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
      let direction = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        direction.push(t);
      });
      return direction;
    });
  }
  
};

