import React from "react";
import styles from "../assets/scss/TodoTemplates.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TodoTemplates = ({ children }) => {
  return <div className={cx("TodoTemplate")}>{children}</div>;
};

export default TodoTemplates;
