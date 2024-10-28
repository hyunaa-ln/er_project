import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                    alert('인증번호가 발송되었습니다.');
                    navigate('/id/code', { state: { email } });
                } else {
                    alert('인증번호 발송에 실패했습니다.');
                }
            } else {
                const data = await checkResponse.json();
                setError(data.emailError || '알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            setError('서버와 통신 중 오류가 발생했습니다.');
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default JoinPage;
