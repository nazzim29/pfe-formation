
const Model = require("./model");
const fs = require("fs");
const storage = require("../utils/firebaseapp").storage();

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
  creat() {
    return this.colref.add({
      titre : this.titre,
      description: this.description,
      signature: this.signature,
      keywords: this.keywords,
      files: this.files,
      video: this.video,
      createur: this.createur,
      date_creation: this.date_creation,
      date_modification: this.date_modification,
      comments: this.comments,
      like: this.like,
      views: this.views,
      valider_df:this.valider_df
    }).then((doc) => {
      this._id = doc.id
    })
  }
  read() {
    return this.docref.get().then((doc) => {
      if(!doc.exists) return console.log('makach')
      let f = doc.data()
      this.titre = f.titre
      this.description= f.description
      this.signature= f.signature
      this.keywords= f.keywords
      this.files= f.files
      this.video= f.video
      this.createur= f.createur
      this.date_creation= f.date_creation
      this.date_modification= f.date_modification
      this.comments= f.comments
      this.like= f.like
      this.views = f.views
      this.valider_df = f.valider_df
    })
  }
  update() {
    return this.docref.set({
			titre: this.titre,
			description: this.description,
			signature: this.signature,
			keywords: this.keywords,
			files: this.files,
			video: this.video,
			createur: this.createur,
			date_creation: this.date_creation,
			date_modification: this.date_modification,
			comments: this.comments,
			like: this.like,
      views: this.views,
      valider_df:this.valider_df
		});
  }
  delete() {
    return this.docref.delete()
  }
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
  upload({path,mimetype,filename}) {
    return new Promise((resolve, reject) => {
			fs.readFile(path, (err, file) => {
				if (err) reject(err);
				let dirref = storage.ref(
					"DocsCours/" + filename.replace("docs[]", "docs")
				);
				dirref
					.put(file, { contentType: mimetype })
					.then((snap) => {
						snap.ref.getDownloadURL().then((url) => {
              fs.rm(path, (err) => {
                if (err) return console.log(err)
                console.log('fichier supprimé')
                
              });
							resolve(url);
						});
					})
					.catch((err) => reject(err));
			});
		});
  }
  get valider_df() {
    return this._valider_df;
  }
  set valider_df(value) {
    this._valider_df = value;
  }
  get titre() {
    return this._titre;
  }
  set titre(value) {
    this._titre = value;
  }
  
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  
  get signature() {
    return this._signature;
  }
  set signature(value) {
    this._signature = value;
  }
  
  get keywords() {
    return this._keywords;
  }
  set keywords(value) {
    this._keywords = value;
  }
  
  get files() {
    return this._files;
  }
  set files(value) {
    this._files = value;
  }
  
  get video() {
    return this._video;
  }
  set video(value) {
    this._video = value;
  }

  get createur() {
    return this._createur;
  }
  set createur(value) {
    this._createur = value;
  }
  
  get date_creation() {
    return this._date_creation;
  }
  set date_creation(value) {
    this._date_creation = value;
  }
  get date_modification() {
    return this._date_modification;
  }
  set date_modification(value) {
    this._date_modification = value;
  }
  
  get comments() {
    return this._comments;
  }
  set comments(value) {
    this._comments = value;
  }
  
  get like() {
    return this._like;
  }
  set like(value) {
    this._like = value;
  }
  get views() {
    return this._views;
  }
  set views(value) {
    this._views = value;
  }
};

