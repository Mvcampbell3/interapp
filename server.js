const express = require("express");
const routes = require("./routes")
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Orogin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  };
  next();
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Send every request to the React app
// Define any API routes before this runs
app.use(routes)

// Change DB name here
const dbase = "playground";

mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost/${dbase}`, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB linked")
  });


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
