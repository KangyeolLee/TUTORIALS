import React from "react";
import classNames from "classnames/bind";
import styles from "../assets/scss/Button.module.scss";

const cx = classNames.bind(styles);

const Button = ({ children, size, color, outline, fullWidth, ...rest }) => {
  return (
    <button
      // className={[styles.Button, styles[size], styles[color]].join(" ")}
      // className={classNames(styles.Button, styles[size], styles[color], {
      //  [styles.outline]: outline,
      //  [styles.fullWidth]: fullWidth,
      //})}
      className={cx("Button", size, color, { outline, fullWidth })}
      {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
