require('dotenv').config()
const express = require('express')
const session = require("./utils/sessionstore")
const ejsSession = require('./utils/ejs-session')
const routes = require('./routes')
const app = express()


/**
 * request body decoder middleware
 */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/public',express.static('./static'))


/**
 * session middleware
 */
app.use(session)
app.use(ejsSession)
/**
 * templating engine "ejs"
 */
app.set('view engine', 'ejs')


/**
 * login, logout & home route
*/
app.use('',routes.baseRoute)

/**
 * launch the server
 */
app.listen(process.env.PORT||3000,(err)=>{
    if(err) return console.log(err)
    console.log("listening on http://localhost:"+ (process.env.PORT || 3000))
})