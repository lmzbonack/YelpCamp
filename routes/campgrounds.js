var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX route - show all campgrounds
router.get("/", function(req, res){
  //grab all the campgrounds through the db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      //pass the campgrounds from the database into the campgrounds.ejs view
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
    }
  });
});

//CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var newName = req.body.name;
  var newPrice = req.body.price;
  var newImage = req.body.image;
  var newDescription = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: newName, price: newPrice, image: newImage, description: newDescription, author:author};
  //Create a new campground and save to database
  Campground.create(newCampground, function(err,campground){
    if(err){
      console.log(err);
    }else{
      //redirect to campground page
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - shows more information about one specific campground
router.get("/:id", function(req, res) {
  //find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err){
      console.log("error");
    }else {
      //render show template with info related to id
      res.render("campgrounds/view", {campground:foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      req.flash("error", "Campground Not Found");
    } else {
    res.render("campgrounds/edit", {campground: foundCampground}); 
    }
  });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  //redirect somewhere (the show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");    
    }
  });
});

module.exports = router;
