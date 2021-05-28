// import { ThunkAction } from 'redux-thunk';
// import { RootState } from '..';
// import { GithubAction } from './types';
import { getUserProfileAsync } from './actions';
import { getUserProfile } from '../../api/github';
import createAsyncThunk from '../../lib/createAsyncThunk';

/*  -- REFACTORING WITH CUSTOM THUNK CREATOR AS BELOW
export function getUserProfileThunk(
  username: string
): ThunkAction<Promise<void>, RootState, null, GithubAction> {
  // ARGS: TReturnType, TState, TExtraThunkArg, TBasicAction
  return async (dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (error) {
      dispatch(failure(error));
    }
  };
} */

export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
);
