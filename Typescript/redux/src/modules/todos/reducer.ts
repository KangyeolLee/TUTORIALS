import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  removeTodo,
  toggleTodo,
  addTodo,
} from './actions';
import { createReducer } from 'typesafe-actions';
import { TodosState, TodosActions } from './types';

const initialState: TodosState = [];

// const todos = createReducer<TodosState, TodosActions>(initialState, {
//   [ADD_TODO]: (state, action) =>
//     state.concat({
//       ...action.payload,
//       done: false,
//     }),
//   [TOGGLE_TODO]: (state, action) =>
//     state.map((todo) =>
//       todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//     ),
//   [REMOVE_TODO]: (state, action) =>
//     state.filter((todo) => todo.id !== action.payload),
// });

const todos = createReducer<TodosState, TodosActions>(initialState)
  .handleAction(removeTodo, (state, action) =>
    state.filter((todo) => todo.id !== action.payload)
  )
  .handleAction(toggleTodo, (state, action) =>
    state.map((todo) =>
      todo.id === action.payload ? { ...todo, done: !todo.done } : todo
    )
  )
  .handleAction(addTodo, (state, action) =>
    state.concat({ ...action.payload })
  );

export default todos;
