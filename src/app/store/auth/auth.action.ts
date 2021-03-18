import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page / sign Up Page] User login',
  props<{ uid: string }>()
);
export const logout = createAction('[Logout Button] logout ');
