const Formation = require("../models/Formation");

exports.getEvents = (req, res) => {
    if(req.query.json)
	return Formation.getAll().then((results) => {
		rows = results.map((el) => {
			return {
				event_date: new Date(el.date_debut),
				event_title: el.titre,
                event_theme: "blue",
                link: "/formation/"+el.id
			};
        });
        return res.json(rows)
    });
    return res.render('pages/calendrier')
};


