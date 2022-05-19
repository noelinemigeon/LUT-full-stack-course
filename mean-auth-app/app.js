const express = require('express');
const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log("Connected to database "+config.database);
});

//On error
mongoose.connection.on('error', (err) => {
    console.log("Database error: "+err);
});

const app = express();

const users = require('./routes/users');
 
//Port number
const port = process.env.PORT || 8080  ;

//CORS Middleware
app.use(cors()); //any domain can access it

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middleware parses incoming request body
app.use(bodyParser.json());

app.use(session({ secret: 'secret' }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use('/users', users)

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint')
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log("Server started on port "+port)
});