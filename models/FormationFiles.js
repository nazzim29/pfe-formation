const Model = require("./model");
const storage = require("../utils/firebaseapp").storage();
const fs = require("fs");
module.exports = class Documentation extends Model {
	static colref = this.db.collection("docuformation");
	constructor(id) {
		super();
		this.colref = this.db.collection("docuformation");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	upload({ path, filename,mimetype }) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, (err, file) => {
				if (err) reject(err);
				let dirref = storage.ref("formationdocs/" + filename.replace('docs\[\]','docs'));
				dirref.put(file, { contentType: mimetype }).then((snapshot) => {
					snapshot.ref.getDownloadURL().then((url) => {
						resolve(url);
					}).catch(e=>reject(e));
				}).catch(e=>reject(e));
			});
		});
	}
	creat() {
		return this.colref
			.add({
				titre: this.titre,
				taille: this.taille,
				lien: this.lien,
				downloads: this.downloads,
			})
			.then((doc) => {
				this._id = doc.id;
			})
			.catch((err) => {
				return err;
			});
	}
	read() {
		return this.docref.get().then((doc) => {
			if (doc.exists) {
				let f = doc.data();
				this.titre = f.titre;
				this.taille = f.taille;
				this.lien = f.lien;
				this.downloads = f.downloads;
			} else {
				return new Error("doc not found");
			}
		});
	}
	update() {
		return this.docref
			.set({
				titre: this.titre,
				taille: this.taille,
				lien: this.lien,
				downloads: this.downloads,
			})
			.catch((err) => {
				return err;
			});
	}
	delete() {
		return this.docref.delete().then(() => {
			u = this.lien.pathname.split("/");
			storage.ref(decodeURIComponent(u[u.length - 1])).delete();
		}).catch((err) => {
			return err;
		});
	}
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let documentation = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				documentation.push(t);
			});
			return documentation;
		});
	}
	get downloads() {
		return this._downloads;
	}
	set downloads(value) {
		this._downloads = value;
	}
	get titre() {
		return this._titre;
	}
	set titre(value) {
		this._titre = value;
	}
	get taille() {
		return this._taille;
	}
	set taille(value) {
		this._taille = value;
	}
	get lien() {
		return this._lien;
	}
	set lien(value) {
		this._lien = value;
	}
};
