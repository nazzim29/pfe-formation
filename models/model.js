const firebase = require('../utils/firebaseadmin');
module.exports = class Model {
    static db = firebase.firestore()
    constructor() {
        this.db = firebase.firestore()
    }
}