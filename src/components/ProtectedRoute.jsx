// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // 💥 useAuth 훅을 사용하여 로그인 상태 및 역할 가져오기

/**
 * 역할 기반 접근 제어 컴포넌트
 * @param {object} props
 * @param {Array<string>} props.allowedRoles - 접근이 허용된 역할 배열 (예: ['admin', 'instructor'])
 * @param {JSX.Element} props.children - 보호할 자식 컴포넌트 (예: <AdminDashboard />)
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, role } = useAuth(); // 인증 상태와 현재 역할 가져오기
    const location = useLocation();

    // 1. 로그인 상태 확인 (인증 Guard)
    if (!isAuthenticated) {
        // 로그인하지 않았다면 로그인 페이지로 리다이렉트 (현재 위치 저장)
        alert('🚨 로그인이 필요합니다.');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. 역할 권한 확인 (권한 Guard)
    if (allowedRoles && !allowedRoles.includes(role)) {
        // 허용된 역할이 아닌 경우, 권한 없음 페이지 또는 대시보드로 리다이렉트
        alert(`⛔ 현재 역할 (${role})은 접근 권한이 없습니다.`);
        
        // 권한 없는 사용자를 자신의 대시보드로 돌려보냅니다.
        let redirectTo = '/';
        if (role === 'instructor') {
            redirectTo = '/instructor/dashboard';
        } else if (role === 'student') {
            redirectTo = '/student/dashboard';
        }

        return <Navigate to={redirectTo} replace />;
    }


    
    // 3. 모든 검사를 통과하면 자식 컴포넌트 렌더링
    return children;
};

export default ProtectedRoute;