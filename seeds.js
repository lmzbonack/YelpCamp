var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {name: "Aiur",
     image: "https://www.travelwyoming.com/sites/default/site-files/files/styles/16_9_wide/public/assets/YNP_hero1_v2.gif?itok=XZWzSem7&timestamp=1457981209",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies ligula felis, id bibendum elit luctus et. Sed dapibus consequat ultricies. Curabitur id est sit amet mi commodo euismod. Suspendisse nec accumsan dui. Vestibulum a pharetra tortor, aliquet vulputate ante. Nullam a porta eros, a eleifend velit. Vivamus rhoncus porttitor urna, facilisis venenatis erat fermentum nec. Ut cursus est sed sapien maximus, at laoreet ipsum dignissim."},
    {name: "Char",
     image: "https://www.travelwyoming.com/sites/default/site-files/files/styles/16_9_wide/public/assets/YNP_hero1_v2.gif?itok=XZWzSem7&timestamp=1457981209",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies ligula felis, id bibendum elit luctus et. Sed dapibus consequat ultricies. Curabitur id est sit amet mi commodo euismod. Suspendisse nec accumsan dui. Vestibulum a pharetra tortor, aliquet vulputate ante. Nullam a porta eros, a eleifend velit. Vivamus rhoncus porttitor urna, facilisis venenatis erat fermentum nec. Ut cursus est sed sapien maximus, at laoreet ipsum dignissim."},
    {name: "Jupitor",
     image: "https://www.travelwyoming.com/sites/default/site-files/files/styles/16_9_wide/public/assets/YNP_hero1_v2.gif?itok=XZWzSem7&timestamp=1457981209",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies ligula felis, id bibendum elit luctus et. Sed dapibus consequat ultricies. Curabitur id est sit amet mi commodo euismod. Suspendisse nec accumsan dui. Vestibulum a pharetra tortor, aliquet vulputate ante. Nullam a porta eros, a eleifend velit. Vivamus rhoncus porttitor urna, facilisis venenatis erat fermentum nec. Ut cursus est sed sapien maximus, at laoreet ipsum dignissim."}
  ];
  
function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Campgrounds removed");
      //Create some campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          } else {
            console.log("campground added");
            //create a comment
            Comment.create(
              {
                text: "Satisfactory comment",
                author: "Homer"
              }, function(err, comment){
                if(err){
                  console.log(err);
                } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
                }
              });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
