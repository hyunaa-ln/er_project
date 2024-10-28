import React from 'react'
import { useNavigate } from 'react-router-dom'

function PwdPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/nickName');
    };

  return (
    <div className='findPwd'>
        <h2 className='join_h2'>회원가입</h2>
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

export default PwdPage