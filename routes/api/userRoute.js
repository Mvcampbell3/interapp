const router = require("express").Router();
const passport = require("../../config/passport");
const User = require("../../models/User");

// Get all of the users, will be gated or deleted
router.get("/all", (req,res) => {
  User.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// Returns user populated with their tasks information
router.get("/withtasks", (req,res) => {
  if (req.user) {
    // res.json({user:true})
    User.findById(req.user._id)
      .select("-email -password")
      .populate("tasks")
      .then(result => res.json(result))
      .catch(err => res.json(err))
  } else {
    res.json({user:false})
  }
})

// Creates new user, model handles the bcrypting of password
router.post("/signup", (req, res) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => res.json(err));
});

// Passport local strategy login authentication, returns boolean
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: true });
});

// Logs user out from passport
router.get("/logout", function(req, res) {
  req.logout();
  res.json({ loggedOut: true });
});

module.exports = router;