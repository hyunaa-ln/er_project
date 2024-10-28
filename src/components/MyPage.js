import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ nickname: '', username: '' });
    const [error, setError] = useState('');

    // Fetch user info when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        // Fetch user information from the API
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/mypage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include the JWT token in the header
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); // Save user info to state
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage || '사용자 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                setError('서버와 통신 중 오류가 발생했습니다.');
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Remove login state
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <BackButton />

            <h2 className="mypage_h2">마이페이지</h2>

            <div className="mypage_profile">
                <div className="mypage_thumb">
                    <img alt="" />
                </div>
                <div className="mypage_nameBox">
                    <p>{user.nickname || '닉네임 없음'}</p>
                    <p>{user.username || '이메일 없음'}</p>
                </div>
            </div>

            <ul className="mypage_list">
                <li>
                    <Link to="">내가 쓴 글</Link>
                </li>
                <li>
                    <Link to="">내가 쓴 댓글</Link>
                </li>
                <li>
                    <Link to="">비밀번호 수정</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>로그아웃</button>
                </li>
            </ul>

            <button className="unregister">회원탈퇴</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default MyPage;
