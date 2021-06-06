const Partenaire = require('../models/Partenaire')
exports.create = (req,res)=>{
    console.log(req.body)
    if(!req.body.description) return res.send('description manquante')
    if(!req.body.type) return res.send('type manquant')
    if(!req.body.nom) return res.send('nom manquant')
    let partenaire = new Partenaire();
    partenaire.nom = req.body.nom
    partenaire.type = req.body.type
    partenaire.description = req.body.description
    partenaire.create().then((err)=>{
        res.send(err)
    })
}
exports.read = (req,res)=>{
    res.render('pages/partenaire')
}
exports.update = (req,res)=>{

}
exports.delet = (req,res)=>{

}