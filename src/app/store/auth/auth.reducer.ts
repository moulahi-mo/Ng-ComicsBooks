import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.action';

const initilaleState: string = null;

const newAuthReducer = createReducer(
  initilaleState,
  on(authActions.login, (state, { uid }) => (state = uid)),
  on(authActions.logout, (state) => (state = null))
);

export function AuthReducer(state = initilaleState, action: Action) {
  return newAuthReducer(state, action);
}
