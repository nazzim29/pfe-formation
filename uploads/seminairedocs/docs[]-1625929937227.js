const Model = require("./model");

module.exports = class Cours extends Model {
	static colref = this.db.collection("cours");
	constructor(id) {
		super();
		this.colref = this.db.collection("cours");
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
			let cours = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				cours.push(t);
			});
			return cours;
		});
  }
  titre
  description
  visite
  files
  
};
