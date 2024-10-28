import React from 'react'
import { useNavigate } from 'react-router-dom'

function FindPwdPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/findPwdCode');
    };

  return (
    <div className='findPwd'>
        <h2>비밀번호 찾기</h2>
        <p>인증 코드를 받을 이메일을 입력해 주세요</p>

        <form>
            <div>
                <label htmlFor='username'>이메일</label>
                <input
                    type='email'
                    id='username'
                    required
                    placeholder='이메일 입력'
                />
                <button type='submit' onClick={handleClick}>코드 전송하기</button>
            </div>
        </form>
    </div>
  )
}

export default FindPwdPage