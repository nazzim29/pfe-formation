
const Animateur = require("../models/Animateur");

exports.create = (req, res) => {
    let anim = new Animateur()
    anim.nom = req.body.nom
    anim.prenom = req.body.prenom
    anim.age = req.body.age
    anim.sexe = req.body.sexe
    anim.domaine = req.body.domaine
    return anim.creat().then((e) => {
        res.send(e||'ok')
    })
};
exports.update = (req,res)=>{
    let anim = new Animateur(req.params.id)
    anim.read().then(() => {
        if(req.body.nom) anim.nom = req.body.nom
        if(req.body.prenom) anim.prenom = req.body.prenom
        if(req.body.age) anim.age = req.body.age
        if(req.body.sexe) anim.sexe = req.body.sexe
        if (req.body.domaine) anim.domaine = req.body.domaine
        anim.update().then(() => {
            res.send('ok')
        })
    })
}
exports.read = (req, res) => {
    let id = req.params.id
    if (req.query.json) return Animateur.getAll().then((animateurs) => {
        return res.json(animateurs)
    })
    return res.render('pages/admin/animateur')
};
exports.delet = (req, res) => {
    return new Animateur(req.params.id).delete().then(()=>res.send('ok'))
};

