const router = require("express").Router();
const passport = require("../../config/passport");
const User = require("../../models/User");

router.get("/all", (req,res) => {
  User.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get("/test", (req,res) => {
  if (req.user) {
    res.json({user:true})
  } else {
    res.json({user:false})
  }
})

router.post("/signup", (req, res) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => res.json(err));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: true });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.json({ loggedOut: true });
});

module.exports = router;