const db = require('../utils/firebaseadmin').firestore();
module.exports = class User{
    static colref = db.collection('usertest')
    constructor (_id){
        if(_id){
            this.id = _id
            this.docref = this.colref.doc(this.id);
        }
    }
    read () {
        this.docref.get().then((doc)=>{
            if(doc.exists){
                return doc.data()
            }else{
                throw new Error('user not found')
            }
        }).catch((error)=>{
            console.log('error',error.message);
        })
    }
    static getAll(){
        return this.colref.get().then((snapshot)=>{
            let users = []
            snapshot.forEach( doc => {
                users.push(doc.data())
            });
            return users
        }).catch((error)=>{
            throw new Error(error.message)
        })

    }
}