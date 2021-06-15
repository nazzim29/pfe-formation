const Formation = require("../models/Formation");
const Formateur = require("../models/Formateur");
const Lieu = require("../models/Lieu");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body.type) return res.send("type manquant");
  if (!req.body.titre) return res.send("titre manquant");
  if (!req.body.description) return res.send("description manquante");
  if (!req.body.date_fin) return res.send("date de fin manquante");
  if (!req.body.date_debut) return res.send("date de debut manquante");
  if (!req.body.activite) return res.send("activite manquante");
  if (!req.body.place) return res.send("nombre de place manquant");
  if (!req.body.lieu) return res.send("lieu manquant");
  if (!req.body.formateur) return res.send("formateur manquant");
  let formation = new Formation();
  formation.type = req.body.type;
  formation.titre = req.body.titre;
  formation.description = req.body.description;
  formation.date_fin = req.body.date_fin;
  formation.date_debut = req.body.date_debut;
  formation.activite = req.body.activite;
  formation.place = req.body.place;
  formation.lieu = req.body.lieu;
  formation.formateur = req.body.formateur;
  formation.creat().then((err) => {
    if (err) return res.send(err);
    res.send("ok");
  });
};
exports.read = (req, res) => {
  let id = req.params?.id;
  if (req.session.currentUser._role == "admin") {
    if (req.query.json)
      return Formation.getAll().then((f) => {
        let c = [];
        f.forEach((element) => {
          let lieu = new Lieu(element.lieu);
          c.push(
            lieu.read().then(() => {
              element.lieu = {
                id: lieu._id,
                nom: lieu.nom,
              };
            })
          );
          let formateur = new Formateur(element.formateur);
          c.push(
            formateur.read().then(()=>{
              element.formateur = {
                id: formateur._id,
                nom: formateur.nom,
                prenom: formateur.prenom
              }
            })
          )
        });
        Promise.all(c).then(()=>{console.log(f);return res.json(f)})
      });
    if (!id) return res.render("pages/admin/formation");
  }
  if (!id) return res.render("pages/formation");
  let formation = new Formation(id);
  formation.read().then(() => {
    return res.render("pages/formationprofile");
  });
};
exports.update = (req, res) => {
  let formation = new Formation(req.params.id);
  formation.read().then(() => {
    if (req.body.type) formation.type = req.body.type;
    if (req.body.date_fin) formation.date_fin = req.body.date_fin;
    if (req.body.date_debut) formation.date_debut = req.body.date_debut;
    if (req.body.activite) formation.activite = req.body.activite;
    if (req.body.place) formation.place = req.body.place;
    if (req.body.lieu) formation.lieu = req.body.lieu;
    if (req.body.formateur) formation.formateur = req.body.formateur;
    if (req.body.titre) formation.titre = req.body.titre;
    if (req.body.description) formation.description = req.body.description;
    formation.update().then((err) => {
      if (err) return res.send(err);
      res.send("ok");
    });
  });
};
exports.delet = (req, res) => {
  new Formation(req.params.id).delete().then((err) => {
    if (err) return res.send(err);
    return res.send("ok");
  });
};
exports.subscribe = (req, res) => {};
