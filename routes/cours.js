
const router = require("express").Router()
const {create,read,update,delet} = require("../Controllers/CoursController")
const Cours = require("../models/Cours")


router.get('/', read)
router.get('/add',(req,res)=>res.render('pages/admin/coursadd'))
router.get('/edit/:id', (req, res) => {
    let cours = new Cours(req.params.id)
    cours.read().then(() => {
        res.render('pages/admin/coursadd',{cours})
    })
})
router.get('/:id',read)
router.post('/',create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router




