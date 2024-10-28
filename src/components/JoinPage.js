import React from 'react'
import { useNavigate } from 'react-router-dom'

function JoinPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/code');
    };

  return (
    <div className='findPwd'>
        <h2 className='join_h2'>회원가입</h2>
        <form>
            <div>
                <label htmlFor='username'>이메일</label>
                <input
                    type='email'
                    id='username'
                    required
                    placeholder='이메일 입력'
                />
                <button type='submit' onClick={handleClick}>입력완료</button>
            </div>
        </form>
    </div>
  )
}

export default JoinPage