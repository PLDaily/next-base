import { createAction, handleActions } from 'redux-actions';
import * as Rx from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/partition';

export interface State {
  status: string;
}

export const initialState: State = {
  status: ''
};

interface XProps {
  success?: boolean;
  error?: boolean;
  data?: any;
}

// actionTypes
const FETCH_USER_UPGRADE = 'FETCH_USER_UPGRADE';
const FETCH_USER_UPGRADE_FAIL = 'FETCH_USER_UPGRADE_FAIL';
const FETCH_USER_UPGRADE_SUCCESS = 'FETCH_USER_UPGRADE_SUCCESS';

// actions
const searchUserFail = createAction(FETCH_USER_UPGRADE_FAIL);
export const searchUserSuccess = createAction(FETCH_USER_UPGRADE_SUCCESS);
export const searchUser = createAction(FETCH_USER_UPGRADE);

// reducers
const user = handleActions({
  [FETCH_USER_UPGRADE_SUCCESS]: (state, { payload }) => ({ ...state, ...payload }),

  [FETCH_USER_UPGRADE_FAIL]: (state, { payload }) => ({ ...state, ...payload }),
}, initialState);

export const reducers = {
  user,
};

// epics
const searchUserEpics = action$ => action$.ofType(FETCH_USER_UPGRADE)
  .mergeMap(action => {
    const [success, error] = Rx.Observable
      .fromPromise(new Promise(resolve => resolve({
        success: true,
        data: action.payload
      })))
      .partition((x: XProps) => x.success);
    const success$ = success.map((x: XProps) => searchUserSuccess({ ...x.data }));
    const error$ = error.map((x: XProps) => searchUserFail(x.error));
    return Rx.Observable.merge(success$, error$);
  });

export const epics = [
  searchUserEpics,
];
