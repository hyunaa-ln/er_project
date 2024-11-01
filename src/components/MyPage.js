import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { useModal } from '../components/ModalContext';
import Unregister from '../components/Unregister';

function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ nickname: '', username: '' });
    const [error, setError] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const { openModal , closeModal } = useModal();

    const handleOpenLogoutModal = () => {
        openModal(
            <div>
                <h2>로그아웃 하시겠습니까?</h2>
                <p>로그아웃 하시려면 확인 버튼을 눌러주세요.</p>
                <button onClick={handleLogout}>확인</button>
            </div>
        );
    };

    const handleOpenUnregisterModal = () => {
        setInputPassword(''); // 초기화
        setModalOpen(true); // 모달 열기
    };

    const handleUnregister = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/mypage/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword: inputPassword }),
            });

            if (response.ok) {
                localStorage.removeItem('token'); // 토큰 삭제
                closeModal(); // 모달 닫기
                alert('회원탈퇴가 완료되었습니다.');
                navigate('/login'); // 로그인 페이지로 이동
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || '회원탈퇴에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('회원탈퇴에 실패했습니다.');
        }
    };

    // Fetch user info when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/mypage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage || '사용자 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                setError('서버와 통신 중 오류가 발생했습니다.');
                console.error(error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        closeModal(); // 모달 닫기
        navigate('/login'); // 로그인 페이지로 이동
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
                    <p>
                        {user.nickname || '닉네임 없음'}
                        <span className="badge">{user.myMbti || '-'}</span>
                    </p>
                    <p>{user.username || '이메일 없음'}</p>
                </div>
            </div>

            <ul className="mypage_list">
                <li>
                    <Link to="/my-posts">내가 쓴 글</Link>
                </li>
                <li>
                    <Link to="/my-comments">내가 쓴 댓글</Link>
                </li>
                <li>
                    <Link to="/resetMbti">나의 MBTI 수정</Link>
                </li>
                <li>
                    <Link to="/resetPwd">비밀번호 수정</Link>
                </li>
                <li>
                    <button onClick={handleOpenLogoutModal}>로그아웃</button>
                </li>
            </ul>

            <button className="unregister" onClick={handleOpenUnregisterModal}>
                회원탈퇴
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* AlertModal 컴포넌트 추가 */}
            <Unregister 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                inputPassword={inputPassword} 
                setInputPassword={setInputPassword} 
                onSubmit={handleUnregister} 
            />
        </div>
    );
}

export default MyPage;
