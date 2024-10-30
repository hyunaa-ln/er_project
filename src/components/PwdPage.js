import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../components/ModalContext';

function PwdPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const { openModal } = useModal();

    const handleOpenPwdFailedModal = () => {
        openModal(
            <div>
                <h2>비밀번호 불일치</h2>
                <p>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            handleOpenPwdFailedModal();
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
            </form>
        </div>
    );
}

export default PwdPage;
