// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slices/taskSlice.jsx";
import authReducer from "../slices/authSlice.jsx";
import { authApiService } from '../apis/Auth';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApiService.reducerPath]: authApiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiService.middleware),
});

export default store;
