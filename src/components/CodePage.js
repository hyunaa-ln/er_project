import React from 'react'
import { useNavigate } from 'react-router-dom'

function CodePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/pwd');
    };

  return (
    <div className='findPwd'>
        <h2>이메일 인증번호를 입력하세요</h2>
        <p>asd@gmail.com으로 인증번호를 발송했습니다.</p>

        <form>
            <div>
                <label htmlFor=''>인증코드</label>
                <input
                    type='number'
                    id=''
                    required
                    placeholder='6자리 인증코드 입력'
                />
                <button type='submit' onClick={handleClick}>인증하기</button>
            </div>
        </form>
    </div>
  )
}

export default CodePage