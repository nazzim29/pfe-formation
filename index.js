require("dotenv").config();
global.XMLHttpRequest = require("xhr2");
const express = require("express");
const { isAuth } = require("./middleware/Auth");
const session = require("./middleware/sessionstore");
const ejsSession = require("./middleware/ejs-session");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");
const app = express();

/**
 * request body decoder middleware
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use("/public", express.static("./static"));
app.use("/sw.js", express.static("./sw.js"))
app.get("/manifest.json", (req, res) => {
	res.sendFile(__dirname + '/manifest.json')
})

/**
 * session middleware
 */
app.use(session);
app.use(ejsSession);
/**
 * templating engine "ejs"
 */
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	require('./models/Partenaire').getAll().then((partenaires) => res.render("pages/accueil",{partenaires}));
});
app.get('/calendrier', (req, res) => {
	if(req.query.json) return res.json([
		{
			event_date: new Date(2021, 6, 29),
			event_title: "April Fool's Day",
			event_theme: "blue",
		},

		{
			event_date: new Date(2020, 3, 10),
			event_title: "Birthday",
			event_theme: "red",
		},

		{
			event_date: new Date(2020, 3, 16),
			event_title: "Upcoming Event",
			event_theme: "green",
		},
	]);
	res.render('pages/calendrier')
})
/**
 * login, logout & home route
 */
app.use("", routes.baseRoute);
app.use("/user", isAuth, routes.userRoute);
app.use("/partenaire", isAuth, routes.partenaireRoute);
app.use("/formation", isAuth, routes.formationRoute);
app.use("/formateur", isAuth, routes.formateurRoute);
app.use("/lieu", isAuth, routes.lieuRoute);
app.use("/postulation", isAuth, routes.postulationRoute);
app.use("/direction", isAuth, routes.directionRoute);

/**
 * launch the server
 */
app.listen(process.env.PORT || 3000, (err) => {
	if (err) return console.log(err);
	console.log("listening on http://localhost:" + (process.env.PORT || 3000));
});
