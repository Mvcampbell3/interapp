const router = require("express").Router();
const Task = require("../../models/Task");

router.get("/all", (req,res) => {
  Task.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

module.exports = router;