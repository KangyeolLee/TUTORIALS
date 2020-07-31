import React from "react";
import styles from "../assets/scss/TodoTemplates.module.scss";
import classNames from "classnames/bind";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoContext } from "../contexts/TodoContext";

const cx = classNames.bind(styles);

const TodoItem = ({ id, done, text }) => {
  const { dispatch } = useTodoContext();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });

  return (
    <div className={cx("TodoItem")} onClick={onToggle}>
      <div className={cx("circle", { done })}>{done && <MdDone />}</div>
      <div className={cx("todoText", { done })}>{text}</div>
      <div className={cx("removeIcon")} onClick={onRemove}>
        <MdDelete />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
