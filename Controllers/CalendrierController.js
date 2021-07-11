const Formation = require("../models/Formation");
const Seminaire = require("../models/Seminaire");

exports.getEvents = (req, res) => {
    if (req.query.json) {
        let a = events = []
        a.push(Seminaire.getAll().then(r => {
            return r.forEach((el) => {
                events.push({
                    event_date: new Date(el.date_debut),
                    event_title: el.titre,
                    event_theme: 'red',
                    link:'/seminaire/'+el.id
                })
            })
        }))
        
        a.push(Formation.getAll().then((results) => {
            return results.map((el) => {
                events.push({
                    event_date: new Date(el.date_debut),
                    event_title: el.titre,
                    event_theme: "blue",
                    link: "/formation/" + el.id
                });
            });
        }))
        return Promise.all(a).then((s) => {
            res.json(events)
        })
    }
        return res.render('pages/calendrier')
};


