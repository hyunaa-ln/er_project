// src/components/ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // 토큰이 있으면 로그인 상태로 간주

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
