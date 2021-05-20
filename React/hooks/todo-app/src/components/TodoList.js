import React from "react";
import styles from "../assets/scss/TodoTemplates.module.scss";
import classNames from "classnames/bind";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../contexts/TodoContext";

const cx = classNames.bind(styles);

const TodoList = () => {
  const { state } = useTodoContext();

  return (
    <div className={cx("TodoList")}>
      {state.map((todo) => (
        <TodoItem
          text={todo.text}
          done={todo.done}
          id={todo.id}
          key={todo.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
