import React, { useState } from "react";
import { firebase } from "../firebase";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { FaTrashAlt } from "react-icons/fa";

const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };
  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        aria-label="Confirm Deletion of Project"
        className="sidebar__project-delete none-outline"
        data-testid="delete-project"
        onKeyDown={() => setShowConfirm(!showConfirm)}
        onClick={() => setShowConfirm(!showConfirm)}
        role="button"
        tabIndex={0}>
        <FaTrashAlt />

        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure want to delete this project?</p>
              <button
                className="none-outline"
                type="button"
                onClick={() => deleteProject(project.docId)}>
                Delete
              </button>
              <span
                className="none-outline"
                aria-label="Cancel Adding Project, not delete"
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                role="button"
                tabIndex={0}>
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default IndividualProject;
