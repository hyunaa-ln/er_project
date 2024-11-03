import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';

import Navigation from './Navigation'

function RootLayout() {
    const location = useLocation();

    // 하단 네비게이션 바를 표시할 경로 조건 설정
    const navRoutes = ['/', '/setMbti', '/getMbti', '/community'];
    const dynamicRoutes = [/^\/communityPost\/\d+$/, /^\/editPost\/\d+$/]; // 동적 라우트를 정규식으로 정의

    // 현재 경로가 고정 경로 목록에 포함되어 있는지 또는 동적 라우트와 일치하는지 확인
    const showBottomNav = 
        navRoutes.includes(location.pathname) || 
        dynamicRoutes.some((regex) => regex.test(location.pathname));


  return (
    <div>
        <Outlet />
        {showBottomNav && <Navigation />} {/* 조건에 따라 하단 네비게이션 바 표시 */}
    </div>
  )
}

export default RootLayout