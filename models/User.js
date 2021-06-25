const Model = require("./model");
const fadmin = require("../utils/firebaseadmin");
const firestore = require("firebase-admin").firestore;
const { auth } = require("firebase-admin");
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

  update() {
    if (!this._id) throw new Error("Id not defined");
    return (
      this.docref.get().then((snapshot) => {
        if (!snapshot.exists) throw new Error("User not found");
        let d = snapshot.data();
        this.date_modification = new Date();
        if (!this.nom) this.nom = d.nom;
        if (!this.prenom) this.prenom = d.prenom;
        if (!this.role) this.role = d.role;
        if (!this.activite) this.activite = d.activite;
        return this.docref.update({
          nom: this.nom,
          prenom: this.prenom,
          role: this.role,
          activite: this.activite,
          date_modification: firestore.Timestamp.fromMillis(
            new Date(this.date_modification).getTime()
          ),
        });
      }),
      fadmin
        .auth()
        .getUser(this._id)
        .then((currentUser) => {
          if (!this.email) this.email = currentUser.email;
          if (!this.display_name) this.display_name = currentUser.displayName;
          if (!this.avatar)
            this.avatar =
              currentUser.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/at-formation-353d2.appspot.com/o/Avatar%2Fdefault.jpg?alt=media&token=250482c6-75ad-44af-8153-7022eaa6ba36";
          return fadmin
            .auth()
            .updateUser(this._id, {
              email: this.email,
              displayName: this.display_name,
              photoURL: this.avatar,
            })
            .catch((err) => {
              throw new Error("erreur lors de la mise a jour du profil");
            });
        })
    );
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
          this.direction = f.direction
          return fadmin
            .auth()
            .getUser(this._id)
            .then((userrecord) => {
              this.date_creation = Date(userrecord.creationTime);
              this.email = userrecord.email;
              this.derniere_connexion = Date(userrecord.lastSignInTime);
              this.avatar = userrecord.photoURL;
            })
            .catch((error) => {
              throw new Error(error);
            });
        } else {
          throw new Error("user not found");
        }
      })
      .catch((error) => {
        throw new Error(error);
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
        let p = [];
        let users = [];
        snapshot.forEach((doc) => {
          let f = doc.data();
          f.id = doc.id;
          f.date_modification = f.date_modification;
          var getinfo = (x) => {
            return fadmin
              .auth()
              .getUser(x)
              .then((userRecord) => {
                f.email = userRecord.email;
                f.displayName = userRecord.displayName;
                f.date_creation = userRecord.metadata.creationTime;
                f.derniere_connexion = userRecord.metadata.lastSignInTime;
                f.avatar = userRecord.photoURL;
                users.push(f);
              });
          };
          p.push(getinfo(doc.id));
        });
        return Promise.all(p).then(() => {
          return users;
        });
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
              new Date().getTime()
            ),
            direction:this.direction
          })
          .catch((error) => {
            fadmin.deleteUser(userRecord.uid).then(()=>{
              return new Error(error)
            });
          });
      })
      .catch((error) => {
        throw new Error(error)
      });
  }
  delete() {
    return fadmin
      .auth()
      .deleteUser(this._id)
      .then((f) => {
        return this.docref.delete().catch((err) => {
          return new Error(err);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  get direction() {
    return this._direction;
  }
  set direction(value) {
    this._direction = value;
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
    return this._date_modification;
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
