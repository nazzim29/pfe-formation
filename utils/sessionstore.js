const firebase = require('./firebaseapp')
const session = require('express-session')
const firestorestore = require('firestore-store')(session)



const db = firebase.firestore()

module.exports = session({
    store: new firestorestore({
        database: db,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave:true,
    cookie:{
        maxAge: 86400000
    }

})

