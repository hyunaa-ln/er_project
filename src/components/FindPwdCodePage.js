import React from 'react'
import { useNavigate } from 'react-router-dom'

function FindPwdCodePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/setNewPwd');
    };

  return (
    <div className='findPwd'>
        <h2>이메일 인증번호를 입력하세요</h2>
        <p>asd@mail.com으로 인증번호를 발송했습니다</p>

        <form>
            <div>
                <label htmlFor='auth'>인증코드</label>
                <input
                    type='number'
                    id='auth'
                    required
                    placeholder='6자리 인증코드 입력'
                />
                <button type='submit' onClick={handleClick}>입력완료</button>
            </div>
        </form>
    </div>
  )
}

export default FindPwdCodePage