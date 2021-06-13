const Formateur = require("../models/Formateur");

exports.create = (req, res) => {

};
exports.update = (req,res)=>{
    
}
exports.read = (req, res) => {
    if(req.session.currentUser._role == "admin"){
        if(req.query.json) return Formateur.getAll().then((f)=>{return res.json(f)})
    }
};
exports.delet = (req, res) => {

};
