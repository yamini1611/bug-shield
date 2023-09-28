// authActions.js
export const storeToken = (token) => ({
    type: 'STORE_TOKEN',
    payload: token,
  });
  
  export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
  });
  
  // authReducer.js
  const initialState = {
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'STORE_TOKEN':
        return {
          ...state,
          token: action.payload,
        };
      case 'REMOVE_TOKEN':
        return {
          ...state,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  