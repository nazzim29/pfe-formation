
const Projet = require("../models/Projet");
const fs = require('fs')
const storage = require('../utils/firebaseapp').storage()

exports.create = (req, res) => {
    let projet = new Projet()
    projet.titre = req.body.titre
    projet.descrption = req.body.descrption
    fs.readFile(req.file.path, (err, file) => {
        if (err) return res.statut(500).send(err)
        let dirref = storage.ref("PhotoProjet/" + req.file.filename);
        dirref.put(file, { contentType: 'image/jpeg' }).then((snap) => {
            snap.ref.getDownloadURL().then((url) => {
                projet.photo = req.body.url
                projet.creat().then((err) => {
                    res.send(err)
                })
            })
        })
        fs.rm(req.file.path, (err) => {
            if (err) return console.log(err)
            return console.log('file removed')
        })
    })

    
};
exports.update = (req,res)=>{
    let projet = new Projet(req.params.id)
    if (req.file) return fs.readFile(req.file.path, (err, file) => {
        if (err) return res.statut(500).send(err)
        let ref = storage.ref("PhotoProjet/" + req.file.filename);
        Promise.all([
            projet.read(),
            ref.put(file,{contentType:'image/jpeg'})
        ]).then((snap) => {
            snap = snap[1]
            let u = new URL(projet.photo)
            u = u.pathname.split('/')
            storage.ref(decodeURIComponent(u[u.length - 1])).delet()
            if(req.body.titre) projet.titre = req.body.titre
            if (req.body.descrption) projet.descrption = req.body.descrption
            snap.ref.getDownloadURL().then((url) => {
                projet.photo = url;
                projet.update().then(() => {
                    res.json(projet)
                })
            })
        })
        fs.rm(req.file.path, err => {
            if (err) return console.log(err)
            return console.log('file removed')
        })
    })
    return projet.read().then(() => {
        if(req.body.titre) projet.titre = req.body.titre
        if (req.body.description) projet.description = req.body.description
        projet.update().then(() => {
            res.json(projet)
        })
    })
}
exports.read = (req, res) => {
    if (req.quey.json) return Projet.getAll().then((projets) => {
        res.json(projets)
    })
    let id = req.params?.id
    if (!id && req.session.currentUser._role == "admin") return res.render('pages/admin/projet')
    if (!id && req.session.currentUser._role != "admin") return Projet.getAll().then((projets) => res.render('pages/projet', { projets }))
    let projet = new Projet(id)
    projet.read().then(()=>res.send(projet))
};
exports.delet = (req, res) => {
    return new Projet(req.params.id).delete().then(() => {
        res.send('ok')
    })
    
};

