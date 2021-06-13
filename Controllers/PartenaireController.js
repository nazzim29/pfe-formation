const Partenaire = require("../models/Partenaire");
const fs = require("fs");
const storage = require("../utils/firebaseapp").storage();
exports.create = (req, res) => {
  if (!req.body.description) return res.send("description manquante");
  if (!req.body.type) return res.send("type manquant");
  if (!req.body.nom) return res.send("nom manquant");
  let partenaire = new Partenaire();
  partenaire.nom = req.body.nom;
  partenaire.type = req.body.type;
  partenaire.description = req.body.description;
  fs.readFile(req.file.path, (err, file) => {
    if (err) return res.send(err);
    let dirref = storage.ref("LogoPartenaires/" + req.file.filename);
    dirref.put(file, { contentType: "image/jpeg" }).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        partenaire.logo = url;
        partenaire.create().then((err) => {
          res.send(err);
        });
      });
      fs.rm(req.file.path, (err) => {
        if (err) return console.log(err);
        return console.log("file removed");
      });
    });
  });
};
exports.read = (req, res) => {
  if (req.query.json)
    return Partenaire.getAll().then((partenaire) => res.json(partenaire));
  let id = req.params?.id;
  if (!id && req.session.currentUser._role == "admin") return res.render("pages/admin/partenaire");
  if (!id && req.session.currentUser._role != "admin") return Partenaire.getAll().then(e=> res.render("pages/partenaire",{partenaires:e}));
  let partenaire = new Partenaire(id);
  partenaire
    .read()
    .then(() => {
      return res.send(partenaire);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.update = (req, res) => {
  let partenaire = new Partenaire(req.params.id);
  if (req.file) {
    fs.readFile(req.file.path, (err, file) => {
      if (err) console.log(err);
      let ref = storage.ref("LogoPartenaires/" + req.file.filename);
      Promise.all([
        partenaire.read(),
        ref.put(file, { contentType: "image/jpeg" }),
      ]).then((snapshot) => {
        snapshot = snapshot[1];
        let u = new URL(partenaire.logo);
        u = u.pathname.split("/");
        storage.ref(decodeURIComponent(u[u.length - 1])).delete();
        partenaire.nom = req.body.nom;
        partenaire.type = req.body.type;
        partenaire.description = req.body.description;
        snapshot.ref.getDownloadURL().then((url) => {
          partenaire.logo = url;
          partenaire.update().then(() => {
            res.json(partenaire);
          });
        });
      });
      fs.rm(req.file.path, (err) => {
        if (err) return console.log(err);
        return console.log("file removed");
      });
    });
  } else {
    partenaire.read().then(() => {
      partenaire.nom = req.body.nom;
      partenaire.type = req.body.type;
      partenaire.description = req.body.description;
      partenaire.update().then(() => {
        res.json(partenaire);
      });
    });
  }
};

exports.delet = (req, res) => {
  let partenaire = new Partenaire(req.params.id);
  partenaire.delete().then(() => {
    res.send("partenaire supprimer");
  });
};
