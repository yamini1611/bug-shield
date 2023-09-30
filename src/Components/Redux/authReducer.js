import { LOGIN_SUCCESS, LOGOUT } from "./authActions";

const initialState = {
  token: localStorage.getItem('token'),
  roleId: sessionStorage.getItem('roleId') || null, 
  userid :sessionStorage.getItem('userid') || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('roleId', action.payload.roleId); 
      sessionStorage.setItem('userid' ,action.payload.userid);

      return {
        ...state,
        token: action.payload.token,
        roleId: action.payload.roleId,
        userid:action.payload.userid,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      sessionStorage.removeItem('roleId'); 
      sessionStorage.removeItem('userid');
      return {
        ...state,
        token: null,
        roleId: null,
        userid:null,
      };

    default:
      return state;
  }
};

export default authReducer;
