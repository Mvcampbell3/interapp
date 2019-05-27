const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  detail: {
    type: String,
    required: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  },

  userID: {
    type: String,
    required: true
  }
})

module.exports = Task = mongoose.model("Task", TaskSchema);