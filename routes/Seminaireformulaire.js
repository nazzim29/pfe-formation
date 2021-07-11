
const router = require("express").Router()
const {create,read,update,delet} = require("../Controllers/SeminaireformulaireController")

router.get("/", read);
router.get("/:id", read);
router.post("/:id", create);
router.delete("/:id", delet);

module.exports = router




