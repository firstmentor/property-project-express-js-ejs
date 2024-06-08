const express = require("express");
const app = express();
const port = 4000;
const web = require("./Routes/web");
const connectdb = require("./Db/connectdb")
const cookieParser = require("cookie-parser");

//token get
app.use(cookieParser())

//image upload
const fileUpload = require('express-fileupload')
//temptiles uploaders
app.use(fileUpload({useTempFiles:true}))
//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash')

//messages
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//flash message
app.use(flash());


//connectdb
connectdb();

//data get
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//for static files
app.use(express.static("public"));

//ejs set html ke liye
app.set("view engine", "ejs");



//router load
app.use("/", web);

app.listen(port, () => {
  console.log(`Server start localhost ${port}`);
});
