import React from 'react';

const Task = props => {
  const { name, detail } = props;
  return (
    <div className="task">
      <h3>{name}</h3>
      <h3>{detail}</h3>
    </div>
  );
}

export default Task;