import React, { useEffect } from 'react';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { setAdmin, setUser } from '../redux/store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import axios from 'axios';

export default function AuthWrapper() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const admin = useSelector((state) => state.admin);
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const adminLocalStorage = JSON.parse(localStorage.getItem("admin"));
    

    useEffect(() => {
        const checkAuth = async () => {
            if (userLocalStorage) {
                dispatch(setUser(userLocalStorage));
            }
            if (adminLocalStorage) {
                dispatch(setAdmin(adminLocalStorage));
            }

        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (user.success) {
            navigate("/");
        }
    }, [user.success, navigate]);

    useEffect(() => {
        axios.get("/checkAdminAuth")
        .then((res) => {
            console.log(res.data);
          if (res.data.message) {
            dispatch(setAdmin())  
          }
        });
      },[admin.success]);

    return (
        <>
            <Routes>
                <Route path='/' element={user.success ? <Home /> : <Login />}></Route>
                <Route path='/register' element={!user.success ? <Register /> : <Home />}></Route>
                <Route path='/login' element={!user.success ? <Login /> : <Home />}></Route>
                <Route path='/adminlogin' element={<AdminLogin />} ></Route>
                <Route path='/admin-dashboard' element={admin.success ? <AdminDashboard /> : <AdminLogin />}></Route>
            </Routes>
        </>
    );
}
