import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const Appstore = configureStore({
    reducer: {
        user: userReducer
    }
})
export default Appstore;