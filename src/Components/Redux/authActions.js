// authActions.js


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (token, roleId ,userid) => ({ 
  type: LOGIN_SUCCESS,
  payload: { token, roleId ,userid},
});

export const logout = () => ({
 
  type: LOGOUT,
  
});
