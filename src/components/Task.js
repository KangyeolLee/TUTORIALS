import React, { useContext } from 'react'
import { TaskListContext } from './../contexts/TaskListContext';

const Task = ({task}) => {
  const { dispatch } = useContext(TaskListContext);

  return (
    <li className="list-item">
      <span>{task.title}</span>
      <div>
        <button onClick={() => dispatch({type: "DELETE_TASK", id : task.id})} className="btn-delete task-btn">
          <i className="fas fa-trash-alt"></i>
        </button>

        <button onClick={() => dispatch({type: "FIND_TASK", id : task.id})} className="btn-edit task-btn">
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </li>
  )
}

export default Task
