import { v4 as uuid } from "uuid";
import { collatedTasks } from "./../constants";

export const getTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
  projects.find((project) => project.key === key);

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);

export const generatePushId = () => uuid();
