import { createSlice } from "@reduxjs/toolkit";

// const userFromStorage = localStorage.getItem("user");

// const initialState = {
//   user: userFromStorage ? JSON.parse(userFromStorage) : null,
//   isAuthenticated: userFromStorage ? true : false,
// };

const authSlice = createSlice({
  name: "auth",
  initialState:{
    user:null,
    isAuthenticated:false

  },
  reducers: {
    setUser: (state,action) => {
         state.user =  action.payload
         state.isAuthenticated = true
    },

    logout:(state) => {
      state.user = null,
      state.isAuthenticated = false
    }
  },
});

export const {setUser,logout}  = authSlice.actions 

export default authSlice.reducer
