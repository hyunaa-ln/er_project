import React from 'react'
import { useNavigate } from 'react-router-dom'

function SetNewPwdPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

  return (
    <div className='findPwd'>
        <h2>새로운 비밀번호를 입력해 주세요</h2>
        <p>새로 사용하게될 비밀번호를 입력해 주세요</p>

        <form>
            <div>
                <label htmlFor=''>비밀번호</label>
                <input
                    type='password'
                    id=''
                    required
                    placeholder='6자리 이상, 특수문자 포함'
                />
                <label htmlFor=''>비밀번호 확인</label>
                <input
                    type='password'
                    id=''
                    required
                    placeholder='비밀번호 재입력'
                />
                <button type='submit' onClick={handleClick}>입력완료</button>
            </div>
        </form>
    </div>
  )
}

export default SetNewPwdPage