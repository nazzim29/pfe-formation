const Direction = require("../models/Direction");
const User = require('../models/User')

exports.create = (req, res) => {
    if(!req.body.nom) return res.send('nom manquant')
    if (!req.body.directeur) return res.send('directeur manquant')
    if (req.session.currentUser._role != "admin") return res.status(403).send('unauthorized')
    let d = new Direction()
    d.nom = req.body.nom
    d.directeur = req.body.directeur
    d.creat().then(() => {
        res.send('ok')
    })
    
};
exports.update = (req, res) => {
    if(req.session.currentUser._role != "admin") return res.status(403).send('unauthorized')
    let id = req.params.id
    let d = new Direction(id)
    d.read().then(() => {
        d.nom = req.body.nom
        d.directeur = req.body.directeur
        d.update().then(() => {
            res.send('ok')
        })
    })
}
exports.read = (req, res) => {
    let id = req.params.id
    if (id) {
        let dir = new Direction(id)
        dir.read().then(() => {
            return res.render('pages/direction', {
                direction:dir
            })
        }).catch(err => {
            res.status(404).send('not found')
        })
    }
    if (!id) {
        if (req.query.json) {
            Direction.getAll().then(d => {
                let a = new Array()
                d.forEach(element => {
                    if(!element.directeur) return
                    let u = new User(element.directeur)
                    a.push(
                        u.read().then(() => {
                            element.directeur = {
                                id: u._id,
                                nom: u.nom,
                                prenom: u.prenom,
                                avatar: u.avatar,
                                activite: u.activite,
                                email: u.email,
                            }
                        })
                    )
                });
                Promise.all(a).then(() => {
                    return res.json(d)
                })
            })
        } else {
            if (req.session.currentUser._role == "admin") return res.render('pages/admin/direction')
        }
    }
};
exports.delet = (req, res) => {
    let id = req.params.id

};

