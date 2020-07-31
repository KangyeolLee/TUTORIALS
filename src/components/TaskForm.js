import React, { useContext, useState, useEffect } from 'react'
import { TaskListContext } from './../contexts/TaskListContext';

const TaskForm = () => {
  const { dispatch, editable } = useContext(TaskListContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!editable.status) {
      dispatch({type: "ADD_TASK", title});
      setTitle("");
    } else {
      dispatch({type: "EDIT_TASK", title, id: editable.content.id });
      setTitle("");
    }
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if(editable.status) {
      setTitle(editable.content.title);
    } else {
      setTitle("");
    }
  }, [editable.status])

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={title} onChange={handleChange} type="text" className="task-input" placeholder="Add Task..." required />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">{ editable.status ? "Edit Task" : "Add Task" }</button>
        <button onClick={() => dispatch({type: "CLREAR_TASK"})} className="btn clear-btn">Clear</button>
      </div>
    </form>
  )
}

export default TaskForm;
