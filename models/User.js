const Model = require('./model')
module.exports = class User extends Model{
    static colref = this.db.collection('usertest')
    /**
     * @constructor
     * @param {string} id
     */
    constructor (id){
        super()
        this.colref = this.db.collection('usertest')
        if(id){
            this._id = id
            this.docref = this.colref.doc(this._id);
        }
    }
    /**
     * @param {void}
     * @returns {object} user
     */
    read () {
        return this.docref.get().then((doc)=>{
            if(doc.exists){
                return doc.data()
            }else{
                throw new Error('user not found')
            }
        }).catch((error)=>{
            console.log('error',error.message);
        })
    }
    /**
     * @param {void}
     * @returns {array }users
     */
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
    
    /**
     * @param {void}
     * @returns {string} role
     */
    get role() { return this._role}

    /**
     * @param {string} value
     * @returns {void}
     */
    set role(value) { this._role = value.toLocaleLowerCase();}

    /**
     * @param {void}
     * @returns {string} activite
     */
    get activite() {return this._activite}

    /**
     * @param {string} value
     * @returns {void}
     */
    set activite(value) {this._activite = value}

    /**
     * @param {void}
     * @returns {string} email
     */
    get email() {return this._email}

    /**
     * @param {string} value
     * @returns {void}
     */
    set email(value) {
        this._email = value;
    }
    
    /**
     * @param {void}
     * @returns {Date} date_creation
     */
    get date_creation() {return this._date_creation}

    /**
     * @param {Date} value
     * @returns {void}
     */
    set date_creation(value) {this._date_creation = value}

    /**
     * @param {void}
     * @returns {Date} date_modification
     */
    get date_modification() {return this._date_modification}

    /**
     * @param {Date} value
     * @returns {void}
     */
    set date_modification(value) {this._date_modification = value}

    /**
     * @param {void}
     * @returns {string} avatar
     */
    get avatar() {return this._avatar}


    /**
     * @param {string} value
     * @returns {void}
     */
    set avatar(value) {this._avatar = value}
}