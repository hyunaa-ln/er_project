import React from 'react'
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icon-arrow-back-android-mono.svg'

function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동 
    };

    
  return (
    <button onClick={handleBack} className='backBtn'>
      <img src={backIcon} alt='back'/>
    </button>
  )
}

export default BackButton