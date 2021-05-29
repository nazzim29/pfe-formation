const Model = require("./model");
const fadmin = require("../utils/firebaseadmin");
const firestore = require("firebase-admin").firestore;
module.exports = class User extends Model {
  static colref = this.db.collection("usertest");
  /**
   * @constructor
   * @param {string} id
   */
  constructor(id) {
    super();
    this.colref = this.db.collection("usertest");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }

  /**
   * @param {void}
   * @returns {Promise} user
   */
  read() {
    return this.docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          let f = doc.data();
          this.prenom = f.prenom;
          this.nom = f.nom;
          this.role = f.role;
          this.activite = f.activite;
          this.date_modification = f.date_modification;
          return fadmin
            .auth()
            .getUser(this._id)
            .then((userrecord) => {
              console.log("ha nktb wsh b9a");
              this.date_creation = Date(userrecord.creationTime);
              this.email = userrecord.email;
              this.derniere_connexion = Date(userrecord.lastSignInTime);
              this.avatar = userrecord.photoURL;
            })
            .catch((error) => {
              console.log("error");
            });
        } else {
          throw new Error("user not found");
        }
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }
  /**
   * @param {void}
   * @returns {array }users
   */
  static getAll() {
    return this.colref
      .get()
      .then((snapshot) => {
        let p =[];
        let users = [];
        snapshot.forEach((doc) => {
            let f = doc.data();
            f.id= doc.id
            f.date_modification = f.date_modification.toDate()
            var  getinfo = (x)=>{
                return fadmin.auth().getUser(x).then((userRecord)=>{
                    f.email = userRecord.email
                    f.displayName = userRecord.displayName
                    f.date_creation = userRecord.metadata.creationTime
                    f.derniere_connexion = userRecord.metadata.lastSignInTime
                    f.avatar = userRecord.photoURL
                    users.push(f)
                })
            }
            p.push(getinfo(doc.id))
        });
        return Promise.all(p).then(()=>{
            return users;
        })
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
  create() {
    return fadmin
      .auth()
      .createUser({
        email: this.email,
        password: this.password,
        displayName: this.display_name,
        photoURL:
          this.avatar ||
          "https://firebasestorage.googleapis.com/v0/b/at-formation-353d2.appspot.com/o/Avatar%2Fdefault.jpg?alt=media&token=250482c6-75ad-44af-8153-7022eaa6ba36",
      })
      .then((userRecord) => {
        return this.colref
          .doc(userRecord.uid)
          .set({
            prenom: this.prenom,
            nom: this.nom,
            role: this.role,
            activite: this.activite,
            date_modification: firestore.Timestamp.fromMillis(
              new Date(this.date_modification).getTime()
            ),
          })
          .catch((error) => {
            fadmin.deleteUser(userRecord.uid);
            return error.code;
          });
      })
      .catch((error) => {
        return error.code;
      });
  }
  /**
   * @param {void}
   * @returns {string} display_name
   */
  get display_name() {
    return this._display_name;
  }

  /**
   * @param {string} value
   * @returns {void}
   */

  set display_name(value) {
    this._display_name = value;
  }

  /**
   * @param {void}
   * @returns {Date} derniere_connexion
   */
  get derniere_connexion() {
    return this._derniere_connexion.toDate();
  }

  /**
   * @param {Date} value
   * @returns {void}
   */
  set derniere_connexion(value) {
    this._derniere_connexion = value;
  }

  /**
   * @param {void}
   * @returns {string} role
   */
  get role() {
    return this._role;
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  set role(value) {
    this._role = value.toLocaleLowerCase();
  }

  /**
   * @param {void}
   * @returns {string} activite
   */
  get activite() {
    return this._activite;
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  set activite(value) {
    this._activite = value;
  }

  /**
   * @param {void}
   * @returns {string} email
   */
  get email() {
    return this._email;
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  set email(value) {
    this._email = value;
  }

  /**
   * @param {void}
   * @returns {Date} date_creation
   */
  get date_creation() {
    return this._date_creation.toDate();
  }

  /**
   * @param {Date} value
   * @returns {void}
   */
  set date_creation(value) {
    this._date_creation = value;
  }

  /**
   * @param {void}
   * @returns {Date} date_modification
   */
  get date_modification() {
    return this._date_modification?.toDate() || new Date();
  }

  /**
   * @param {Date} value
   * @returns {void}
   */
  set date_modification(value) {
    if (typeof value !== "Date")
      return (this._date_modification = Date(value._secondes));
    this._date_modification = value;
  }

  /**
   * @param {void}
   * @returns {string} avatar
   */
  get avatar() {
    return this._avatar;
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  set avatar(value) {
    this._avatar = value;
  }
};
