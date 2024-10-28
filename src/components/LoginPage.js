import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
/*img*/
import logo from '../assets/Logo.svg'

function LoginPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/id/join');
    };


  return (
    <div>
        <Link to='/' className='login_h1'>
            <h1>
                <img src={logo} alt='logo'/>
                <span>응급실</span>
            </h1>
        </Link>

        <form className='login_form'>
            <div>
                <label htmlFor='username'>이메일</label>
                <input
                    type='email'
                    id='username'
                    required
                    placeholder='이메일 입력'
                />
            </div>
            <div>
                <label htmlFor='password'>비밀번호</label>
                <input
                    type='password'
                    id='password'
                    required
                    placeholder='비밀번호 입력'
                />
            </div>
            <button type="submit"><span>로그인</span></button>
            <button onClick={handleClick} type="button"><span>회원가입</span></button>
            <Link to="/id/findPwd" className='findpwd'>비밀번호 찾기</Link>
        </form>
    </div>
    
  )
}

export default LoginPage