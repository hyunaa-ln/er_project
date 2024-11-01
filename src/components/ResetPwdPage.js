import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function ResetPwdPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
        if (newPassword !== confirmNewPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('비밀번호를 수정하는데 실패했습니다.');
            }

            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/'); // 비밀번호 변경 후 메인 페이지로 이동
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="resetPwd">
            <BackButton />
            <h2>비밀번호 수정</h2>

            <form className="resetPwdForm" onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <label htmlFor="currentPassword">현재 비밀번호</label>
                <input
                    type="password"
                    id="currentPassword"
                    required
                    placeholder="사용중인 비밀번호를 입력하세요"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label htmlFor="newPassword">새 비밀번호</label>
                <input
                    type="password"
                    id="newPassword"
                    required
                    placeholder="6자리 이상, 특수문자 포함"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    required
                    placeholder="비밀번호 재입력"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <div className="done">
                    <button type="submit">입력완료</button>
                </div>
            </form>
        </div>
    );
}

export default ResetPwdPage;
