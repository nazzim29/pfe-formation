require("dotenv").config();
global.XMLHttpRequest = require("xhr2");
const express = require("express");
const { isAuth, isNotAuth, adminOnly } = require("./middleware/Auth");
const session = require("./middleware/sessionstore");
const ejsSession = require("./middleware/ejs-session");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");
const app = express();

/**
 * request body decoder middleware
 */
app.use(express.json({ limit: "5gb" }));
app.use(express.urlencoded({ extended: true, limit: "5gb" }));
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

app.get("/",isNotAuth, (req, res) => {
	require('./models/Partenaire').getAll().then((partenaires) => res.render("pages/accueil", { partenaires }));
});


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
app.use("/calendrier", isAuth, routes.calendrierRoute);
app.use("/formulaire", isAuth, routes.formulaireRoute);
app.use("/seminaireformulaire", isAuth, routes.seminaireformulaireRoute);
app.use("/seminaire", isAuth, routes.seminaireRoute);
app.use("/animateur", isAuth, routes.animateurRoute);
app.use("/projet", isAuth, routes.projetRoute);
app.use("/cours", isAuth, routes.coursRoute);
app.get("/cour", (req,res)=>res.render("pages/cours"));

/**
 * launch the server
 */
app.listen(process.env.PORT || 3000, (err) => {
	if (err) return console.log(err);
	console.log("listening on http://localhost:" + (process.env.PORT || 3000));
});
