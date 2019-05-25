const router = require("express").Router();
const userRoute = require("./userRoute");
const taskRoute = require("./taskRoute")

// When User goes to "/api/posts", use routes defined in postsRoute.js
router.use("/user", userRoute);
router.use("/task", taskRoute)


module.exports = router;
