import React, { createContext, useReducer, useContext } from "react";
import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState,
} from "./asyncActionUtils";
import * as api from "./api";

// const initialState = {
//   users: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   user: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };

// const loadingState = {
//   loading: true,
//   data: null,
//   error: null,
// };

// const success = (data) => ({
//   loading: false,
//   data,
//   error: null,
// });

// const error = (error) => ({
//   loading: false,
//   data: null,
//   error,
// });

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

const usersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);

    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);

    default:
      throw new Error(`Unhanded action type : ${action.type}`);
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserProvider");
  }
  return dispatch;
};

// export const getUsers = async (dispatch) => {
//   dispatch({ type: "GET_USERS" });
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/users`
//     );
//     dispatch({ type: "GET_USERS_SUCCESS", data: response.data });
//   } catch (e) {
//     dispatch({ type: "GET_USERS_ERROR", error: e });
//   }
// };

// export const getUser = async (dispatch, id) => {
//   dispatch({ type: "GET_USER" });
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/users/${id}`
//     );
//     dispatch({ type: "GET_USER_SUCCESS", data: response.data });
//   } catch (e) {
//     dispatch({ type: "GET_USER_ERROR", error: e });
//   }
// };

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
