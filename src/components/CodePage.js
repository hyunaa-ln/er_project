import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../components/ModalContext';

function CodePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const email = location.state?.email || '';
    const { openModal } = useModal();

    const handleOpenCodeFailedModal = () => {
        openModal(
            <div>
                <h2>인증에 실패했습니다.</h2>
                <p>인증번호가 일치하지 않습니다. 다시 입력해주세요.</p>
            </div>
        );
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/auth/join/emails/verification-requests?username=${encodeURIComponent(
                    email
                )}&code=${code}`,
                { method: 'GET' }
            );

            if (response.ok) {
                alert('인증에 성공했습니다.');
                navigate('/id/pwd', { state: { email } });
            } else {
                handleOpenCodeFailedModal();
            }
        } catch (error) {
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="findPwd">
            <h2>이메일 인증번호를 입력하세요</h2>
            <p>{email}으로 인증번호를 발송했습니다.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code">인증코드</label>
                    <input
                        type="number"
                        id="code"
                        required
                        placeholder="6자리 인증코드 입력"
                        value={code}
                        onChange={handleCodeChange}
                    />
                    <button type="submit">인증하기</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default CodePage;