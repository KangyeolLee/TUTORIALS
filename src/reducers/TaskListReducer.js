import { v4 as uuid } from 'uuid';

export const TaskListReducer = (state, action) => {
  switch(action.type) {
    case "ADD_TASK" :
      return {
        ...state,
        tasks : [...state.tasks, {
          title : action.title,
          id : uuid(),
        }],
      }

    case "DELETE_TASK" :
      return {
        ...state,
        tasks : state.tasks.filter(task => task.id !== action.id)
      }

    case "EDIT_TASK" :
      const newTasks = state.tasks.map(task => (task.id === action.id) 
      ? { title : action.title, id : action.id } : task );
      return {
        ...state,
        tasks : [...newTasks],
        editable : {
          status : false,
          content : {},
        }
      };
    
    case "FIND_TASK" :
      const target = state.tasks.find(task => task.id === action.id);
      return {
        ...state,
        editable : {
          status : true,
          content : target,
        }
      };

    case "CLREAR_TASK" :
      return {
        ...state,
        tasks : [],
      };

    default :
      return state;
  }
}