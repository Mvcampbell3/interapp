const router = require("express").Router();

router.get("/test", (req,res) => {
  res.json("working here at api/user/test");
})

module.exports = router;