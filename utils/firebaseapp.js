const admin = require('firebase-admin')
const firebase = require('firebase').initializeApp({
    apiKey: "AIzaSyDfrFSvLkngJZPCpvq6lq5DVC0-lCDOanc",
    authDomain: "at-formation-353d2.firebaseapp.com",
    projectId: "at-formation-353d2",
    storageBucket: "at-formation-353d2.appspot.com",
    messagingSenderId: "922755252542",
    appId: "1:922755252542:web:ffde24f83f45b8e9742c6f",
    measurementId: "G-HBHQZSWGT3"
})
firebaseadmin = admin.initializeApp({
    credential: admin.credential.cert("utils/at-formation-353d2-firebase-adminsdk-wmtjj-7584d53b7f.json"),
    databaseURL: "https://at-formation-353d2.firebaseio.com"
})

exports.auth = firebase.auth()
exports.firestore = firebaseadmin.firestore()