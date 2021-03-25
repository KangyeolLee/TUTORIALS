import { createAction, ActionType, createReducer } from 'typesafe-actions';
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1;

// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text,
//   },
// });
export const addTodo = createAction(ADD_TODO, (text: string) => ({
  id: nextId++,
  text,
}))<Todo>();

// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// });
export const toggleTodo = createAction(TOGGLE_TODO, (id: number) => ({
  id,
}))();

// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// });
export const removeTodo = createAction(REMOVE_TODO, (id: number) => ({
  id,
}))();

// type TodosActions =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;
const actions = { addTodo, toggleTodo, removeTodo };
type TodosActions = ActionType<typeof actions>;

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};
export type TodosState = Todo[];

const initialState: TodosState = [];

// function todos(
//   state: TodosState = initialState,
//   action: TodosActions
// ): TodosState {
//   switch (action.type) {
//     case ADD_TODO:
//       return state.concat({
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false,
//       });
//     case TOGGLE_TODO:
//       return state.map((todo) =>
//         todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
//       );
//     case REMOVE_TODO:
//       return state.filter((todo) => todo.id !== action.payload.id);
//     default:
//       return state;
//   }
// }
const todos = createReducer<TodosState, TodosActions>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
      done: false,
    }),
  [TOGGLE_TODO]: (state, action) =>
    state.map((todo) =>
      todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
    ),
  [REMOVE_TODO]: (state, action) =>
    state.filter((todo) => todo.id !== action.payload.id),
});

export default todos;
