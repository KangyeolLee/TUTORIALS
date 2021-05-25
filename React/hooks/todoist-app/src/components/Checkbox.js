import React from "react";
import { firebase } from "../firebase";

const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      aria-label={`Mark ${taskDesc} as done?`}
      className="checkbox-holder none-outline"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
      rolr="button"
      tabIndex={0}>
      <span className="checkbox"></span>
    </div>
  );
};

export default Checkbox;
