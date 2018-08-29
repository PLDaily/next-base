import { createAction, handleActions } from 'redux-actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/partition';

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
  [FETCH_USER_UPGRADE_SUCCESS]: (state, { payload }) => {
    console.log({ ...state, ...payload })
    return { ...state, ...payload }
  },
  [FETCH_USER_UPGRADE_FAIL]: (state, { payload }) => ({ ...state, ...payload }),
}, {});

export const reducers = {
  user,
};

// epics
const searchUserEpics = action$ => action$.ofType(FETCH_USER_UPGRADE)
  .mergeMap(action => {
    const [success, error] = Observable
      .fromPromise(new Promise(resolve => resolve({
        success: true,
        data: action.payload
      })))
      .partition(x => x.success);
    const success$ = success.map(x => searchUserSuccess({ ...x.data }));
    const error$ = error.map(x => searchUserFail(x.error));
    return Observable.merge(success$, error$);
  });

export const epics = [
  searchUserEpics,
];
