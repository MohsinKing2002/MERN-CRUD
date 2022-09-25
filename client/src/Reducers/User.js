import {createReducer} from '@reduxjs/toolkit';
const initialState = {};

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state)=>{
        state.loading = true;
    },

    LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },

    LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    RegisterUserRequest: (state)=>{
        state.loading = true;
    },

    RegisterUserSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    RegisterUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    LoginUserRequest: (state)=>{
        state.loading = true;
    },

    LoginUserSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = true;
    },

    LoginUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    LogoutUserRequest: (state)=>{
        state.loading = true;
    },
    
    LogoutUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
    },

    LogoutUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    UpdateProfileRequest: (state)=>{
        state.loading = true;
    },

    UpdateProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    UpdateProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    DeleteProfileRequest: (state)=>{
        state.loading = true;
    },

    DeleteProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },
    DeleteProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    ContactRequest: (state)=>{
        state.loading = true;
    },

    ContactSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    ContactFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state)=>{
        state.error = null;
    },
    clearMessages: (state)=>{
        state.message = null;
    }

})

//get all user
export const allUserReducer = createReducer(initialState, {
    AllUserRequest: (state) => {
        state.loading = true;
    },
    AllUserSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    AllUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.message = null;
    }
})