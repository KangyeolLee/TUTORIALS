import React, { useState } from "react";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "./../context";

const AddProject = ({ shouldshow = false }) => {
  const [show, setShow] = useState(shouldshow);
  const [projectName, setProjectName] = useState("");
  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: "tempID__test__",
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit none-outline"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit">
            Add Project
          </button>
          <span
            aria-label="Cancel Adding Project"
            className="add-project__cancel none-outline"
            data-testid="hide-project-overlay"
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(false)}
            role="button"
            tabIndex={0}>
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        className="add-project__text none-outline"
        data-testid="add-project-action"
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
        role="button"
        tabIndex={0}>
        Add Project
      </span>
    </div>
  );
};

export default AddProject;
