import React, { createContext, useReducer, useState, useEffect } from "react";
import { TaskListReducer } from "../reducers/TaskListReducer";

export const TaskListContext = createContext();

const initialState = JSON.parse(localStorage.getItem("tasks")) || {
  tasks: [],
  editable: {
    status: false,
    content: {},
  },
};

const TaskListContextProvider = (props) => {
  const [state, dispatch] = useReducer(TaskListReducer, initialState);
  const { tasks, editable } = state;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  return (
    <TaskListContext.Provider value={{ tasks, editable, dispatch }}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
