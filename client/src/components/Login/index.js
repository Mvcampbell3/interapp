import React from "react";

const Login = (props) => {
  return (
    <div>
      <h1>Login is here</h1>
      <input onChange={e => props.handleInput(e)} name="email" type="text" value={props.email} placeholder="Enter email..." />
      <input onChange={e => props.handleInput(e)} name="password" type="text" value={props.password} placeholder="Enter password..." />
      <button onClick={e => props.loginUser(e)}>Login</button>
    </div>
  );
}

export default Login;