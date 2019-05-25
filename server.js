const express = require("express");
const routes = require("./routes")
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
