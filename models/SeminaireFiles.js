const Model = require("./model");
const storage = require("../utils/firebaseapp").storage();
const fs = require("fs");

module.exports = class Files extends Model {
	static colref = this.db.collection("SeminaireFiles");
	constructor(id) {
		super();
		this.colref = this.db.collection("SeminaireFiles");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
	upload({ path, filename, mimetype }) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, (err, file) => {
				let dirref = storage.ref(
					"seminairedocs/" + filename.replace("docs[]", "docs")
				);
				dirref
					.put(file, { contentType: mimetype })
					.then((snapshot) => {
						snapshot.ref
							.getDownloadURL()
							.then((url) => resolve(url))
							.catch((e) => reject(e));
					})
					.catch((e) => reject(e));
			});
		});
	}
	creat() {
		return this.colref
			.add({
				downloads: 0,
				titre: this.titre,
				taille: this.taille,
				lien: this.lien,
			})
			.then((doc) => {
				this._id = doc.id;
			})
			.catch((err) => err);
	}
	read() {
		return this.docref.get().then((doc) => {
			let f = doc.data();
			this.downloads = f.downloads;
			this.titre = f.titre;
			this.taille = f.taille;
			this.lien = f.lien;
		});
	}
	update() {
		return this.docref
			.set({
				downloads: 0,
				titre: this.titre,
				taille: this.taille,
				lien: this.lien,
			})
			.catch((err) => err);
	}
	delete() {
		return this.docref
			.delete()
			.then(() => {
				u = this.lien.pathname.split("/");
				storage.ref(decodeURIComponent(u[u.length - 1])).delete();
			})
			.catch((err) => {
				return err;
			});
	}
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let SeminaireFiles = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				SeminaireFiles.push(t);
			});
			return SeminaireFiles;
		});
	}

	get titre() {
		return this._titre;
	}
	set titre(value) {
		this._titre = value;
	}

	get downloads() {
		return this._downloads;
	}
	set downloads(value) {
		this._downloads = value;
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
