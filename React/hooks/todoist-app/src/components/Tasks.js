import React, { useEffect } from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "./../hooks/index";
import { collatedTasks } from "./../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "./../helpers";
import { useSelectedProjectValue, useProjectsValue } from "./../context";
import AddTask from "./AddTask";

const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="tasks" data-textid="tasks">
      <h2 data-testid="project-name">{}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};

export default Tasks;
