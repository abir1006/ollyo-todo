import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const queryClient = new QueryClient();

const Login = lazy(() => import('./pages/Login.jsx'));
const Tasks = lazy(() => import('./pages/Tasks.jsx'));

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login"/>}/>
                            <Route path="/login" element={<Login/>}/>
                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute/>}>
                                <Route path="/tasks" element={<Tasks/>}/>
                            </Route>
                        </Routes>
                    </Suspense>
                </Router>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
