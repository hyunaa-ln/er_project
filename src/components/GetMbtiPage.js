import React from 'react'
import { Link, useLocation } from 'react-router-dom';
/*img*/
import logo from '../assets/Logo.svg'
import mbtiImg from '../assets/mbti_img.svg'

function GetMbtiPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mbti = queryParams.get('mbti'); // 'mbti' 매개변수 값 가져오기

  return (
    <div>
      <Link to='/'>
          <h1>
              <img src={logo} alt='logo'/>
              응급실
          </h1>
      </Link>
      <div className='getMbti_wrap'>
        <h2 className='getMbti'>{mbti}</h2>
        <img src={mbtiImg} alt='mbti'></img>
        <p>태그를 가지게 되셨습니다!</p>
        <button>시작하기</button>
      </div>
      
    </div>
  )
}

export default GetMbtiPage