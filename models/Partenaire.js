const Model = require("./model");
const firestore = require("firebase-admin").firestore;

module.exports = class User extends Model {
  static colref = this.db.collection("partenairetest");
  constructor(id) {
    super();
    this.colref = this.db.collection("partenairetest");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  create() {
    return this.colref
      .add({
        nom: this.nom,
        type: this.type,
        description: this.description,
        logo: this.logo,
      })
      .then((doc) => {
        this._id = doc.id;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  delete() {
    return this.docref.delete().catch((err) => {
      throw new Error(err);
    });
  }
  read() {
    return this.docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          let f = doc.data();
          this.description = f.description;
          this.nom = f.nom;
          this.type = f.type;
          this.logo = f.logo;
        } else {
          throw new Error("Partenaire not found");
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
        type: this.type,
        nom: this.nom,
        description: this.description,
        logo: this.logo,
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  static getAll() {
    return this.colref.get().then((snapshot) => {
      let partenaires = [];
      snapshot.forEach((doc) => {
        let t = doc.data()
        t.id = doc.id
        partenaires.push(t);
      });
      return partenaires
    });
  }
  /**
   * @param {void}
   * @returns {string} logo
   */
  get logo() {
    return this._logo;
  }
  /**
   * @param {string} value
   * @returns {void}
   */
  set logo(value) {
    this._logo = value;
  }
  /**
   * @parm {void}
   * @returns {string} type
   */
  get type() {
    return this._type;
  }
  /**
   * @param {string} value
   * @returns {void}
   */
  set type(value) {
    this._type = value;
  }
  /**
   * @param {void}
   * @returns {string} nom
   */
  get nom() {
    return this._nom;
  }
  /**
   * @param {string} value
   * @returns {void}
   */
  set nom(value) {
    this._nom = value;
  }
  /**
   * @param {void}
   * @returns {string} description
   */
  get description() {
    return this._description;
  }
  /**
   * @param {string} value
   * @returns {void}
   */
  set description(value) {
    this._description = value;
  }
};
