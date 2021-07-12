const baseRoute =require("./log")
const userRoute = require('./user');
const partenaireRoute = require('./partenaire');
const formationRoute = require('./formation');
const formateurRoute = require('./formateur');
const lieuRoute = require('./lieu');
const postulationRoute = require('./postulation');
const directionRoute = require('./direction');
const calendrierRoute = require('./calendrier');
const formulaireRoute = require('./formulaire');
const seminaireformulaireRoute = require('./seminaireformulaire');
const seminaireRoute = require('./seminaire');
const animateurRoute = require('./animateur');
const projetRoute = require('./projet');
const coursRoute = require('./cours');


module.exports = {
	baseRoute,
	userRoute,
	partenaireRoute,
	formateurRoute,
	lieuRoute,
	formationRoute,
	coursRoute,
	projetRoute,
	animateurRoute,
	seminaireRoute,
	seminaireformulaireRoute,
	formulaireRoute,
	calendrierRoute,
	directionRoute,
	postulationRoute,
};
