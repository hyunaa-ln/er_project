import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';

import Navigation from './Navigation'

function RootLayout() {
    const location = useLocation();

    const navRoutes = ['/', '/setMbti', '/getMbti', '/community', '/communityPost'];

    const showBottomNav = navRoutes.includes(location.pathname);


  return (
    <div>
        <Outlet />
        {showBottomNav && <Navigation />} {/* 조건에 따라 하단 네비게이션 바 표시 */}
    </div>
  )
}

export default RootLayout