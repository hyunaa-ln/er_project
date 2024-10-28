import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home-sharp.svg';
import solutionIcon from '../assets/chatbubbles-sharp.svg';
import communityIcon from '../assets/people-sharp.svg';
import mypageIcon from '../assets/person-sharp.svg';

function Navigation() {
    const navigate = useNavigate();

    const handleMypageClick = () => {
        // 로그인 상태 체크 (localStorage에 로그인 정보가 있는지 확인)
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn) {
            navigate('/mypage'); // 로그인 상태면 마이페이지로 이동
        } else {
            navigate('/login'); // 로그인하지 않았으면 로그인 페이지로 이동
        }
    };

    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active">
                        <img src={homeIcon} alt="Home" />
                        <p>홈</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/solution" activeClassName="active">
                        <img src={solutionIcon} alt="Solution" />
                        <p>연애솔루션</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/community" activeClassName="active">
                        <img src={communityIcon} alt="Community" />
                        <p>커뮤니티</p>
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleMypageClick} className="nav-link-button">
                        <img src={mypageIcon} alt="Mypage" />
                        <p>마이페이지</p>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
