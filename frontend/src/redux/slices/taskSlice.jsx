import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        setTasks(state, action) {
            return action.payload;
        },
        addTask(state, action) {
            state.push(action.payload);
        },
        removeTask(state, action) {
            return state.filter((_, index) => index !== action.payload);
        },
    },
});

export const { setTasks, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
