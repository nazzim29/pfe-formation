const baseRoute =require("./log")
const userRoute = require('./user');
const partenaireRoute = require('./partenaire');
const formationRoute = require('./formation');
const formateurRoute = require('./formateur');
const lieuRoute = require('./lieu');
const postulationRoute = require('./postulation');
const directionRoute = require('./direction');
const calendrierRoute = require('./calendrier');
const filesRoute = require('./files');


module.exports = {
	baseRoute,
	userRoute,
	partenaireRoute,
	formateurRoute,
	lieuRoute,
	formationRoute,
	filesRoute,
	calendrierRoute,
	directionRoute,
	postulationRoute,
};
