import React from "react";
import moment from "moment";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";

const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  return (
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li data-testid="task-date-today">
            <div
              className="none-outline"
              aria-label="Select Today as the Task Date"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().format("DD/MM/YYYY"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowTaskDate(false);
                  setTaskDate(moment().format("DD/MM/YYYY"));
                }
              }}
              role="button"
              tabIndex={0}>
              <span>
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </div>
          </li>

          <li data-testid="task-date-tomorrow">
            <div
              className="none-outline"
              aria-label="Select Tomorrow as the Task Date"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
                }
              }}
              role="button"
              tabIndex={0}>
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>

          <li data-testid="task-date-next-week">
            <div
              className="none-outline"
              aria-label="Select Next Week as the Task Date"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
                }
              }}
              role="button"
              tabIndex={0}>
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next week</span>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

export default TaskDate;
