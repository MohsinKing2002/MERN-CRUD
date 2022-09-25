import { configureStore } from "@reduxjs/toolkit";
import { allUserReducer, userReducer } from "./Reducers/User";

const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUserReducer
    }
})

export default store;