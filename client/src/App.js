import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";
import Login from "./components/Login";
import Task from "./components/Task"

class App extends Component {
  state = {
    tasks: [],
    user: false,
    email: "",
    password: "",
    time: "",
    rerender: false,
  }

  componentDidMount() {
    this.testUser();
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  loginUser = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    API.loginUser(user)
      .then(result => {
        console.log(result);
        this.setState({ user: true })
        this.getUserAndTasks();
      })
      .catch(err => console.log(err))
  }

  logoutUser = e => {
    e.preventDefault();
    API.logoutUser()
      .then(result => {
        console.log(result);
        this.setState({ tasks: [], user: false })
      })
      .catch(err => console.log(err));
  }

  testUser = () => {
    API.getUserAndTasks()
      .then(result => {
        console.log(result)
        if (result.data.user === false) {
          console.log("not logged in")
          return
        }
        console.log("logged in")
        this.setState({ user: true, tasks: result.data.tasks })
      })
      .catch(err => console.log(err))
  }

  getAllTasks = () => {
    API.getAllTasks()
      .then(tasks => {
        this.setState({ tasks: tasks.data })
      })
      .catch(err => console.log(err))
  }

  getUserAndTasks() {
    API.getUserAndTasks()
      .then(result => {
        const user = result.data;
        console.log(user)
        this.setState({ email: "", password: "", tasks: user.tasks })
      })
      .catch(err => console.log(err));
  }

  updateCompleted = e => {
    e.preventDefault();
    const isCompleted = e.target.value;
    API.updateCompleted(e.target.dataset.task_id, isCompleted)
      .then(result => {
        console.log(result)
        this.getUserAndTasks()
      })
      .catch(err => console.log(err));
  }



  render() {

    return (
      <div className="container">
        {!this.state.user ? <Login
          handleInput={this.handleInput}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          email={this.state.email}
          password={this.state.password}
        /> : <button onClick={e => this.logoutUser(e)}>Logout</button>}

        {this.state.tasks.map(task => (
          <Task key={task._id} id={task._id} name={task.name} detail={task.detail} isCompleted={task.isCompleted} updateCompleted={this.updateCompleted} />
        ))}

        
        

      </div>
    );
  }
}

export default App;
