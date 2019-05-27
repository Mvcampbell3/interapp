import Axios from "axios";

export default {

  testUser() {
    return Axios.get("/api/user/test")
  },

  loginUser(user) {
    return Axios.post("/api/user/login", user)
  },

  logoutUser() {
    return Axios.get("/api/user/logout");
  },

  getAllTasks() {
    return Axios.get("/api/task/all");
  },

  getUserAndTasks() {
    return Axios.get("/api/user/withtasks");
  },

  updateCompleted(id, isCompleted) {
    return Axios.put(`/api/task/updatecompleted/${id}`, {isCompleted:isCompleted})
  }

}