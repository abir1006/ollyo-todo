// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slices/taskSlice.jsx";
import authReducer from "../slices/authSlice.jsx";
import { authApiService } from '../apis/Auth';
import {taskApiService} from "../apis/Task/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        [authApiService.reducerPath]: authApiService.reducer,
        [taskApiService.reducerPath]: taskApiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiService.middleware)
            .concat(taskApiService.middleware),
});

export default store;
