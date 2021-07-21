import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// Authentication Modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

//Authentication Objects
let localStrategy = passportLocal.Strategy; //Alias 
import User from '../Models/user';

// CORS modules
import cors from 'cors';

// Express Web App Configuration
const app = express();
export default app;

// initialize flash
app.use(flash())

//initialize passport
app.use(passport.initialize);
app.use(passport.session());

//import an auth strategy 
passport.use(User.createStrategy());

//module for auth message and error management
import flash from 'connect-flash';


//Database access
import * as DBConfig from "./db";
mongoose.connect(DBConfig.RemoteURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function()
{
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

// setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}))


// attach router files
import indexRouter from "../Routes/index";
// IMPORT ROUTER FROM '../Routes/...';


// view engine setup
app.set("views", path.join(__dirname, "../Views"));
app.set("view engine", "ejs");
  
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Client")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

// add support for CORS
app.use(cors());

// create routing through event handling
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err:createError.HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//module.exports = app;
