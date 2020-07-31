import React, { useState } from "react";
import styles from "../assets/scss/TodoTemplates.module.scss";
import classNames from "classnames/bind";
import { MdAdd } from "react-icons/md";
import { useTodoContext } from "../contexts/TodoContext";

const cx = classNames.bind(styles);

const TodoCreate = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { dispatch, nextId } = useTodoContext();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      <div className={cx("TodoCreate", { open })}>
        <form onSubmit={onSubmit} className={cx("insertForm")}>
          <input
            type="text"
            autoComplete="true"
            placeholder="할 일을 입력 후, Enter를 누르세요"
            onChange={onChange}
            value={value}
            className={cx("inputText")}
          />
        </form>
      </div>
      <button className={cx("createBtn", { open })} onClick={onToggle}>
        <MdAdd />
      </button>
    </>
  );
};

export default React.memo(TodoCreate);
