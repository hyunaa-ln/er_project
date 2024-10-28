import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import thumb from '../assets/Vector.svg';

function NickNamePage() {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password, nickname }),
            });

            if (response.ok) {
                alert('회원가입이 완료되었습니다.');
                navigate('/joinComplete');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="findPwd">
            <img src={thumb} className="nick_thumb" alt="thumb" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>닉네임</label>
                    <input
                        type="text"
                        required
                        placeholder="닉네임 입력"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button type="submit">입력완료</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default NickNamePage;
