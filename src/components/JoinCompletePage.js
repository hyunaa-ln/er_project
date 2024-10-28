import React from 'react'
import { Link } from 'react-router-dom'
/*img*/
import logo from '../assets/Logo.svg'

function JoinCompletPage() {
  return (
    <div className='complete'>
      <Link to='/' className='login_h1'>
        <h1>
            <img src={logo} alt='logo'/>
            <span>응급실</span>
        </h1>
      </Link>
      <p>가입이 완료되었습니다.</p>
      <Link to='/' className='complete_btn'>메인으로</Link>
    </div>
  )
}

export default JoinCompletPage