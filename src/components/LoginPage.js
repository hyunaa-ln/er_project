import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.svg';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // 서버에서 JWT 토큰 수신
                const token = response.headers.get('Authorization')?.replace('Bearer ', '');

                if (token) {
                    // 토큰을 localStorage에 저장
                    localStorage.setItem('token', token);
                    alert('로그인 성공!');
                    navigate('/'); // 로그인 성공 시 홈 페이지로 이동
                } else {
                    setError('토큰을 받아올 수 없습니다.');
                }
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || '로그인에 실패했습니다.');
            }
        } catch (error) {
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    const handleJoinClick = () => {
        navigate('/id/join');
    };

    return (
        <div>
            <Link to="/" className="login_h1">
                <h1>
                    <img src={logo} alt="logo" />
                    <span>응급실</span>
                </h1>
            </Link>

            <form className="login_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">이메일</label>
                    <input
                        type="email"
                        id="username"
                        required
                        placeholder="이메일 입력"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        required
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">
                    <span>로그인</span>
                </button>
                <button onClick={handleJoinClick} type="button">
                    <span>회원가입</span>
                </button>
                <Link to="/id/findPwd" className="findpwd">
                    비밀번호 찾기
                </Link>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
