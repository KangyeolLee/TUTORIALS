import { AsyncState } from './../../lib/reducerUtils';
import { GithubProfile } from './../../api/github';
import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type GithubAction = ActionType<typeof actions>;

/* -- REFACTORING WITH CUSTOM REDUCER UTILS CREATOR AS BELOW
export type GithubState = {
  userProfile: {
    loading: boolean;
    error: Error | null;
    data: GithubProfile | null;
  };
};  */

export type GithubState = {
  userProfile: AsyncState<GithubProfile, Error>;
};
