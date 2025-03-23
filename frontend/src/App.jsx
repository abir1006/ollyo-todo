import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import {Provider} from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const queryClient = new QueryClient();
function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="/login" element={<Login/>}/>
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/tasks" element={<Tasks />} />
                        </Route>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
