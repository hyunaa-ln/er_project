import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
/*img*/
import logo from '../assets/Logo.svg'
import mbtiImg from '../assets/mbti_img.svg'
import check from '../assets/checkmark-sharp.svg'

function SetMbtiPage() {
  const [choices, setChoices] = useState({
    EI: '',
    SN: '',
    TF: '',
    PJ: '',
  });

  const navigate = useNavigate();

  const handleChoice = (dimension, choice) => {
    setChoices(prevChoices => ({
      ...prevChoices,
      [dimension]: choice,
    }));
  };

  const getMBTI = () => {
    return `${choices.EI}${choices.SN}${choices.TF}${choices.PJ}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     // 모든 선택이 이루어졌는지 확인
     if (choices.EI && choices.SN && choices.TF && choices.PJ) {
      const mbti = getMBTI();
      navigate(`/getMbti?mbti=${mbti}`);
    } else {
      alert('모든 선택을 완료해야 합니다.'); // 경고 메시지
    }
  };

  const isActive = (dimension, choice) => choices[dimension] === choice;


  return (
    <div>
      <Link to='/'>
          <h1>
              <img src={logo} alt='logo'/>
              응급실
          </h1>
      </Link>

      <div className='setMbti_title'>
        <p>📌문답을 완료하고<br/>응급실을 시작해 보세요!</p>
        <img src={mbtiImg} alt='mbti'></img>
        <h2>당신의 MBTI는?</h2>
      </div>
      <form onSubmit={handleSubmit} className='mbitform'>
        <div className='btn_wrap'>
          <div className='mbitBtn'>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('EI', 'E') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('EI', 'E')}
            >
              E
            </button>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('EI', 'I') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('EI', 'I')}
            >
              I
            </button>
          </div>

          <div className='mbitBtn'>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('SN', 'S') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('SN', 'S')}
            >
              S
            </button>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('SN', 'N') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('SN', 'N')}
            >
              N
            </button>
          </div>

          <div className='mbitBtn'>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('TF', 'T') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('TF', 'T')}
            >
              T
            </button>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('TF', 'F') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('TF', 'F')}
            >
              F
            </button>
          </div>

          <div className='mbitBtn'>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('PJ', 'P') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('PJ', 'P')}
            >
              P
            </button>
            <button 
              type="button" 
              style={{ backgroundColor: isActive('PJ', 'J') ? '#FFF3F3' : 'initial' }}
              onClick={() => handleChoice('PJ', 'J')}
            >
              J
            </button>
          </div>
        </div>
        
        <div className='s_mbit'>
          <h2>{getMBTI()} <img src={check} alt='check' className='check'></img></h2>
        </div>

        <button type="submit" className='next'>다음</button>
      </form>
    </div>
  )
}

export default SetMbtiPage