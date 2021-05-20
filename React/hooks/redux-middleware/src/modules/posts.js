import * as postsAPI from "../api/posts";
import {
  // createPromiseThunk,
  // createPromiseThunkById,
  createPromiseSaga,
  createPromiseSagaById,
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
} from "./../lib/asyncUtils";
import { takeEvery, getContext } from "redux-saga/effects";

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

const GO_TO_HOME = "GO_TO_HOME";

// const CLEAR_POST = "CLEAR_POST";

// replaced By redux-saga
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
// // export const clearPost = () => ({ type: CLEAR_POST });
// export const goHome = () => (dispatch, getState, { history }) => {
//   history.push("/");
// };

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
export const goHome = () => ({ type: GO_TO_HOME });
// function* getPostsSaga() {
//   try {
//     const posts = yield call(postsAPI.getPosts); // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다림
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts,
//     });
//   } catch (error) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       error: true,
//       payload: error,
//     });
//   }
// }
// function* getPostSaga(action) {
//   const param = action.payload;
//   const id = action.meta;

//   try {
//     const post = yield call(postsAPI.getPostById, param); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 지정
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id,
//     });
//   } catch (error) {
//     yield put({
//       type: GET_POST_ERROR,
//       error: true,
//       payload: error,
//       meta: id,
//     });
//   }
// }
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
function* goHomeSaga() {
  const history = yield getContext("history");
  history.push("/");
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goHomeSaga);
}

// export const getPosts = () => async (dispatch) => {
//   dispatch({ type: GET_POSTS });
//   try {
//     const posts = await postsAPI.getPosts();
//     dispatch({ type: GET_POSTS_SUCCESS, posts });
//   } catch (error) {
//     dispatch({ type: GET_POSTS_ERROR, error });
//   }
// };

// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST });
//   try {
//     const post = await postsAPI.getPostById(id);
//     dispatch({ type: GET_POST_SUCCESS, post });
//   } catch (error) {
//     dispatch({ type: GET_POSTS_ERROR }, error);
//   }
// };

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };

export default function posts(state = initialState, action) {
  switch (action.type) {
    // case GET_POSTS:
    //   return {
    //     ...state,
    //     posts: reducerUtils.loading(),
    //     // posts: {
    //     //   loading: true,
    //     //   data: null,
    //     //   error: null,
    //     // },
    //   };
    // case GET_POSTS_SUCCESS:
    //   return {
    //     ...state,
    //     posts: reducerUtils.success(action.payload),
    //     // posts: {
    //     //   loading: true,
    //     //   data: action.posts,
    //     //   error: null,
    //     // },
    //   };
    // case GET_POSTS_ERROR:
    //   return {
    //     ...state,
    //     posts: reducerUtils.error(action.error),
    //     // posts: {
    //     //   loading: true,
    //     //   data: null,
    //     //   error: action.error,
    //     // },
    //   };

    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action);

    // case GET_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.loading(),
    //     // post: {
    //     //   loading: true,
    //     //   data: null,
    //     //   error: null,
    //     // },
    //   };
    // case GET_POST_SUCCESS:
    //   return {
    //     ...state,
    //     post: reducerUtils.success(action.payload),
    //     // post: {
    //     //   loading: true,
    //     //   data: action.post,
    //     //   error: null,
    //     // },
    //   };
    // case GET_POST_ERROR:
    //   return {
    //     ...state,
    //     post: reducerUtils.error(action.error),
    //     // post: {
    //     //   loading: true,
    //     //   data: null,
    //     //   error: action.error,
    //     // },
    //   };

    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postReducer = handleAsyncActionsById(GET_POST, "post", true);
      return postReducer(state, action);

    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial(),
    //   };

    default:
      return state;
  }
}
