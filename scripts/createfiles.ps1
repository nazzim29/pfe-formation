$modelname = $args[0]
$modelnamec = $modelname.substring(0, 1).ToUpper() + $modelname.substring(1).ToLower()
$model = "
const Model = require(`"./model`");

module.exports = class $modelnamec extends Model {
  static colref = this.db.collection(`"$modelname`");
  constructor(id) {
    super();
    this.colref = this.db.collection(`"$modelname`");
    if (id) {
      this._id = id;
      this.docref = this.colref.doc(this._id);
    }
  }
  creat() {}
  read() {}
  update() {}
  delete() {}
  static getAll() {
    return this.colref.get().then((snapshot) => {
      let $modelname = [];
      snapshot.forEach((doc) => {
        let t = doc.data();
        t.id = doc.id;
        $modelname.push(t);
      });
      return $modelname;
    });
  }
  
};
"

Out-File -FilePath ./models/$modelnamec.js -InputObject $model

$controller = "
const $modelnamec = require(`"../models/$modelnamec`");

exports.create = (req, res) => {
    
};
exports.update = (req,res)=>{
    
}
exports.read = (req, res) => {
    
};
exports.delet = (req, res) => {
    
};
"
Out-File -FilePath ./controllers/$modelnamec"Controller.js" -InputObject $controller


$route = "
const router = require(`"express`").Router()
const {create,read,update,delet} = require(`"../Controllers/$modelnamec"+"Controller`")


router.get('/',read)
router.get('/:id',read)
router.post('/',create)
router.post('/:id',update)
router.delete('/:id', delet)

module.exports = router



"
Out-File -FilePath ./routes/$modelname.js -InputObject $route


