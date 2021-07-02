const admin = require('firebase-admin')
firebaseadmin = admin.initializeApp({
    credential: admin.credential.cert("utils/at-formation-353d2-firebase-adminsdk-wmtjj-7584d53b7f.json"),
    databaseURL: "https://at-formation-353d2.firebaseio.com"
})

firebaseadmin.firestore().settings({ ignoreUndefinedProperties: true });
module.exports = firebaseadmin