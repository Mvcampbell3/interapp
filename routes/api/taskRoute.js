const router = require("express").Router();
const Task = require("../../models/Task");
const User = require("../../models/User");

router.get("/all", (req, res) => {
  Task.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

router.post("/newtask", (req, res) => {

  let saved, updated;

  if (req.user) {
    const newTask = new Task(req.body);
    newTask.userID = req.user._id;
    newTask.save()
      // Need to push result._id into User Tasks array 
      .then(savedTask => {
        saved = savedTask;
        const taskID = savedTask._id;
        User.findByIdAndUpdate(savedTask.userID, { $push: { tasks: taskID } }, { new: true })
          .then(updatedUser => {
            updated = updatedUser;
            res.json({
              savedTask: saved,
              updatedUser: updated,
            })
          })
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  } else {
    res.json({ user: false })
  }
})

router.get("/user", (req, res) => {
  if (req.user) {
    Task.find({ userID: req.user._id })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  } else {
    res.json({user:false})
  }
})

module.exports = router;