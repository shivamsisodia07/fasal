const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  first_air_date: { type: String },
  id: { type: Number, unique: true },
  overview: { type: String },
  poster_path: { type: String },
  media_type: { type: String },
});

module.exports = mongoose.model("Movie", MovieSchema);
