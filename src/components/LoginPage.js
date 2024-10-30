import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../components/ModalContext'; // 모달 컨텍스트 가져오기
import logo from '../assets/Logo.svg';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { openModal } = useModal(); // 모달 함수 호출

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // 로그인 후 MBTI 확인 및 리다이렉트 처리
    const handleLoginSuccess = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/mypage', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const user = await response.json();

                // myMbti가 null이면 SetMbtiPage로 이동
                if (!user.myMbti) {
                    navigate('/setMbti'); // MBTI 설정 페이지로 이동
                } else {
                    navigate('/'); // 홈 페이지로 이동
                }
            } else {
                console.error('Failed to fetch user info');
                openModal(<div><h2>오류 발생</h2><p>사용자 정보를 가져오는 데 실패했습니다.</p></div>); // 모달로 오류 표시
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            openModal(<div><h2>오류 발생</h2><p>서버와 통신 중 오류가 발생했습니다.</p></div>); // 모달로 오류 표시
        }
    };

    // 로그인 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // JWT 토큰 수신
                const authHeader = response.headers.get('Authorization');
                const token = authHeader?.split(' ')[1]; // 'Bearer ' 접두사 제거
                if (token) {
                    localStorage.setItem('token', token); // 토큰 저장

                    // 로그인 성공 후 MBTI 확인 및 리다이렉트
                    await handleLoginSuccess();
                } else {
                    openModal(<div><h2>오류 발생</h2><p>토큰을 받아올 수 없습니다.</p></div>); // 모달로 오류 표시
                }
            } else {
                const errorResponse = await response.json(); // JSON 형식으로 응답 받기
                const errorMessage = errorResponse.errorMessage || '로그인에 실패했습니다.'; // 오류 메시지 추출
                openModal(<div><h2>로그인 오류</h2><p>{errorMessage}</p></div>); // 모달로 오류 표시
            }
        } catch (error) {
            console.error('Error:', error);
            openModal(<div><h2>오류 발생</h2><p>서버와 통신 중 오류가 발생했습니다.</p></div>); // 모달로 오류 표시
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
            </form>
        </div>
    );
}

export default LoginPage;