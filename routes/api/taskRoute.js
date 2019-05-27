const router = require("express").Router();
const Task = require("../../models/Task");
const User = require("../../models/User");

// Get all of the tasks, regardless of user, this will be removed or gated
router.get("/all", (req, res) => {
  Task.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

// New Task route, adds in userID through req.user
// Pushes created taskID to user tasks
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

// Get all of the tasks associated with that user
router.get("/user", (req, res) => {
  if (req.user) {
    Task.find({ userID: req.user._id })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  } else {
    res.json({ user: false })
  }
})

router.delete("/deltask/:id", (req, res) => {
  if (req.user) {
    Task.findById(req.params.id)
      .then(task => {
        if (task.userID === req.user._id) {
          task.remove()
            .then(result => res.json({
              message: "successfully deleted task",
              taskDeleted: result
            }))
            .catch(err => res.json(err))
        } else {
          res.json("can not delete")
        }
      })
      .catch(err => res.json(err));
  } else {
    res.json({ user: false })
  }
})

router.put("/updatecompleted/:id", (req,res) => {
  if (req.user) {
    Task.findByIdAndUpdate(req.params.id, {$set: {isCompleted: req.body.isCompleted}})
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
})

module.exports = router;