const router = require("express").Router();
const userRoute = require("./userRoute");

// When User goes to "/api/posts", use routes defined in postsRoute.js
router.use("/user", userRoute);


module.exports = router;
