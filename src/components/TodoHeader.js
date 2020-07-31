import React from "react";
import styles from "../assets/scss/TodoTemplates.module.scss";
import classNames from "classnames/bind";
import { useTodoContext } from "../contexts/TodoContext";

const cx = classNames.bind(styles);

const TodoHeader = () => {
  const { state } = useTodoContext();
  const undoneTasks = state.filter((todo) => !todo.done);
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <div className={cx("TodoHeader")}>
      <h1>{dateString}</h1>
      <div className={cx("day")}>{dayName}</div>
      <div className={cx("task-left")}>할 일 {undoneTasks.length}개 남음</div>
    </div>
  );
};

export default TodoHeader;
