import React, { useState } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import IndividualProject from "./IndividualProject";

const Projects = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-textid="project-action"
        className={
          active === project.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }>
        <div
          className="sidebar__project__list none-outline"
          aria-label={`Select ${project.name} as the task Project`}
          role="button"
          tabIndex={0}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}>
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

export default Projects;
