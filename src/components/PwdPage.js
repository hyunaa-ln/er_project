import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PwdPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        navigate('/id/nickName', { state: { email, password } });
    };

    return (
        <div className="findPwd">
            <h2 className="join_h2">회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        required
                        placeholder="6자리 이상, 특수문자 포함"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        required
                        placeholder="비밀번호 재입력"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">입력완료</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default PwdPage;
