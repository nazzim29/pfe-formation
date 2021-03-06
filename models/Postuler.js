const Model = require("./model");

module.exports = class Formateur extends Model {
	static colref = this.db.collection("postulertest");
	constructor(id) {
		super();
		this.colref = this.db.collection("postulertest");
		if (id) {
			this._id = id;
			this.docref = this.colref.doc(this._id);
		}
	}
    creat() {
        return this.colref.doc(this._id).set({
            date: this.date,
            valider_df: this.valider_df,
            valider_superieur:this.valider_superieur
        }).catch(err => {
            throw new Error(err)
        })
    }
	read() {
		return this.docref
			.get()
			.then((doc) => {
				if (doc.exists) {
					let f = doc.data();
					this.user = doc.id.split("_")[0].trim();
					this.formation = doc.id.split("_")[1].trim();
					this.valider_df = f.valider_df;
					this.valider_superieur = f.valider_superieur;
					this.date = f.date;
				} else {
					return new Error("Postulation not found");
				}
			})
			.catch((err) => {
				return new Error(err);
			});
	}
    update() {
        return this.docref.set({
            date: this.date,
            valider_df:this.valider_df,
            valider_superieur:this.valider_superieur
       }) 
    }
    delete() {
        return this.docref.delete().catch((err) => {
            return new Error(err)
        })
    }
	static getAll() {
		return this.colref.get().then((snapshot) => {
			let postulation = [];
			snapshot.forEach((doc) => {
				let t = doc.data();
				t.id = doc.id;
				postulation.push(t);
			});
			return postulation;
		});
    }
    static async validPostulationByFormation(id) {
        return await this.getAll().then((f) => {
            let i = 0
            f.forEach((element) => {
                if(element.id.split("_")[1] == id && element.valider_df == "accepté" && element.valider_superieur == "accepté") i++
            })
            return i
        })
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
    get formation() {
        return this._formation;
    }
    set formation(value) {
        this._formation = value;
    }
    get valider_df() {
        return this._valider_df;
    }
    set valider_df(value) {
        this._valider_df = value;
    }
    get valider_superieur() {
        return this._valider_superieur;
    }
    set valider_superieur(value) {
        this._valider_superieur = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
};
