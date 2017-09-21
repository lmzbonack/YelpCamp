var express = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    User = require("./models/user"),
    flash = require("connect-flash");
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//Tell app to use connect-flash for flash messages
app.use(flash());
//Seed DB
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "What is the color of night?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass logged in user data into every route
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("YelpCamp server has started");
});

 