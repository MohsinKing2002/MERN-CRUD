import axios from 'axios';

//register user
export const registerUser = (name, email, phone, password, avatar)=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "RegisterUserRequest"
        })

        const {data} = await axios.post(`/register`,{
            name, email, phone, password, avatar
        },{
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: "RegisterUserSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "RegisterUserFailure",
            payload: error.response.data.message
        })
    }
}

//login user
export const loginUser = (email, password)=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "LoginUserRequest"
        })

        const {data} = await axios.post(`/login`,{
            email, password
        },{
            headers: {
                "Content-Type": "application/json"
            }
        }
        );

        dispatch({
            type: "LoginUserSuccess",
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: "LoginUserFailure",
            payload: error.response.data.message
        })
    }
}

//load user
export const loadUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "LoadUserRequest"
        })

        const {data} = await axios.get(`/profile`);
        
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })        
    }
}

//log out user
export const logoutUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "LogoutUserRequest"
        })

        const {data} = await axios.get(`/logout`);

        dispatch({
            type: "LogoutUserSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message
        })        
    }
}

//update profile
export const updateProfile = (name, email, phone, avatar)=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "UpdateProfileRequest",
        })

        const {data} = await axios.put(`/update`, {
            name, email, phone, avatar
        })

        dispatch({
            type: "UpdateProfileSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "UpdateProfileFailure",
            payload: error.response.data.message
        })        
    }
}

//delete profile
export const deleteProfile = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "DeleteProfileRequest"
        })

        const {data} = await axios.delete(`/delete`);

        dispatch({
            type: "DeleteProfileSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "DeleteProfileFailure",
            payload: error.response.data.message
        })        
    }
}

//contact message
export const contactMessage = (message)=> async(dispatch)=>{
    try {

        dispatch({
            type: "ContactRequest"
        })

        const {data} = await axios.post(`/contact`, {
            message
        },{
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: "ContactSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "ContactFailure",
            payload: error.response.data.message
        })        
    }
}

//get all users
export const getAllUsers = (name = "")=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "AllUserRequest"
        })

        const {data} = await axios.get(`/users?name=${name}`);

        dispatch({
            type: "AllUserSuccess",
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: "AllUserFailure",
            payload: error.response.data.message
        })        
    }
}