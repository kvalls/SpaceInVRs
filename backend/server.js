require('dotenv').config();
 
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
 
var path = require('path');

const app = express();
const port = process.env.PORT || 4000;


// //jsreport
// app.get('/', (req, res) => {
//   res.send('Hello from the main application');
// });

// const reportingApp = express();
// app.use('/reporting', reportingApp);

// const server = app.listen(3000);

// const jsreport = require('jsreport')({
//   extensions: {
//       express: { app: reportingApp, server: server },
//   },
//   appPath: "/reporting"
// });

// jsreport.init().then(() => {
//   console.log('jsreport server started')
// }).catch((e) => {
//   console.error(e);
// });
 
// //----------


// public directory
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: "http://localhost:8100"
};
// enable CORS
app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// database conection
const db = require("./models");

// For explotation. Database is not dropped.
db.sequelize.sync(); 

// Development only. Drops and re-sync db everytime the server starts.
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if(req.headers.authorization.indexOf('Basic ') === 0){
    // verify auth basic credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    req.body.email = email;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

require("./routes/user.routes")(app);
require("./routes/session.routes")(app);
require("./routes/role.routes")(app);

app.listen(port, () => {
  console.log('Server started on: ' + port);
});