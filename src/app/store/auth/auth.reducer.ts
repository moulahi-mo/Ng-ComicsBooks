import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.action';

const initilaleState: boolean = false;

const newAuthReducer = createReducer(
  initilaleState,
  on(authActions.login, (state) => (state = true)),
  on(authActions.logout, (state) => (state = false))
);

export function AuthReducer(state = initilaleState, action: Action) {
  return newAuthReducer(state, action);
}
