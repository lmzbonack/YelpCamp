var mongoose = require("mongoose");
//Schema setup for campgrounds
var campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

//compile schema into a model and prepare it to be required in YelpCamp
module.exports = mongoose.model("Campground", campgroundSchema);