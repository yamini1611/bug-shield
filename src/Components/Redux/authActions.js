export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const ALLOCATE_QUERY = 'ALLOCATE_QUERY';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const INIT_ALLOCATED_QUERY = 'INIT_ALLOCATED_QUERY';

export const allocateQuery = (queryId) => ({
  type: ALLOCATE_QUERY,
  payload: queryId,
});

export const setSuccessMessage = (message) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message,
});

export const initAllocatedQuery = (queryId) => ({
  type: INIT_ALLOCATED_QUERY, 
  payload: queryId,
});
export const loginSuccess = (token, roleId ,userid) => ({ 
  type: LOGIN_SUCCESS,
  payload: { token, roleId ,userid},
});

export const logout = () => ({
 
  type: LOGOUT,
 
});
