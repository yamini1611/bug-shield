// userRolesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRoles: [],
};


const userRolesSlice = createSlice({
  name: 'userRoles', 
  initialState,
  reducers: {
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
  },
});

export const { setUserRoles } = userRolesSlice.actions;
export default userRolesSlice.reducer;
