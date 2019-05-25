const router = require("express").Router();
const Task = require("../../models/Task");

router.get("/all", (req,res) => {
  Task.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

router.post("/newtask", (req,res) => {
  if (req.user) {
    const newTask = new Task(req.body);
    newTask.userID = req.user._id;

    newTask.save()
      // Need to push result._id into User Tasks array 
      .then(result =>  res.json(result))
      .catch(err => res.json(err))
  } else {
    res.json({user:false})
  }
})

module.exports = router;