import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../components/ModalContext';

function JoinPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { openModal } = useModal();

    const handleOpenErrorModal = (message) => {
        openModal(
            <div>
                <h2>{message}</h2>
            </div>
        );
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const checkResponse = await fetch(
                `http://localhost:8080/api/auth/check-availability?username=${email}&nickname=`,
                { method: 'GET' }
            );

            if (checkResponse.ok) {
                const sendCodeResponse = await fetch(
                    'http://localhost:8080/api/auth/join/emails/verification-requests',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: email }),
                    }
                );

                if (sendCodeResponse.ok) {
                    handleOpenErrorModal('인증번호가 발송되었습니다.');
                    navigate('/id/code', { state: { email } });
                } else {
                    handleOpenErrorModal('인증번호 발송에 실패했습니다.'); // 인증번호 발송 실패 시 모달 띄우기
                }
            } else {
                const data = await checkResponse.json();
                handleOpenErrorModal(data.emailError || '알 수 없는 오류가 발생했습니다.'); // 이메일 검사 오류 시 모달 띄우기
            }
        } catch (error) {
            handleOpenErrorModal('서버와 통신 중 오류가 발생했습니다.'); // 서버 오류 시 모달 띄우기
        }
    };

    return (
        <div className="findPwd">
            <h2 className="join_h2">회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">이메일</label>
                    <input
                        type="email"
                        id="username"
                        required
                        placeholder="이메일 입력"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit">입력완료</button>
                </div>
            </form>
        </div>
    );
}

export default JoinPage;
