import { LOGIN_SUCCESS, LOGOUT } from "./authActions";
import { ALLOCATE_QUERY ,INIT_ALLOCATED_QUERY } from './authActions';

const initialState = {
  token: localStorage.getItem('token') || null,
  roleId: localStorage.getItem('roleId') || null,
  userid: localStorage.getItem('userid') || null,
  allocatedQueryId: null,
  successMessage: '',
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('roleId', action.payload.roleId); 
      localStorage.setItem('roleId', action.payload.roleId);
      return {
        ...state,
        token: action.payload.token,
        roleId: action.payload.roleId,
        userid:action.payload.userid,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userName');
      localStorage.removeItem('userid');
     
      localStorage.removeItem('roleId'); 
      localStorage.removeItem('password');
      sessionStorage.removeItem('roleId'); 
      sessionStorage.removeItem('userid');
      
      return {
        
        ...state,
        token: null,
        roleId: null,
       
      };

      case INIT_ALLOCATED_QUERY:
        return {
          ...state,
          allocatedQueryId: action.payload,
        };
  
      case ALLOCATE_QUERY:
        return {
          ...state,
          allocatedQueryId: action.payload,
        };
      
  
     

    default:
      return state;
  }
};

export default authReducer;
