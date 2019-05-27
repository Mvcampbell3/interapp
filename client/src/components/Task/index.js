import React from 'react';
import "./task.css";

const Task = props => {
  const { id, name, detail, isCompleted } = props;
  console.log(id, name, detail, isCompleted)
  return (
    <div className="task">
      <h3>{name}</h3>
      <h3>{detail}</h3>
      <div className="comp" style={{backgroundColor: isCompleted ? "green":"red"}}></div>
      <button onClick={e => props.updateCompleted(e)} value={!isCompleted} data-task_id={id}>Complete</button>
    </div>
  );
}

export default Task;