import React from 'react';
import logo from '../assets/Logo.svg';

function Unregister({ isOpen, onClose, inputPassword, setInputPassword, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className='alertModal'>
      <div className='modalWrap'>
        <img src={logo} alt='logo' />
        <h2>회원탈퇴 하시겠습니까?</h2>
        <p>회원탈퇴를 하시면 모든 데이터가 삭제됩니다. 계속하시려면 현재 사용중인 비밀번호를 입력하세요.</p>
        <input
          type='password'
          placeholder='비밀번호 확인'
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <div>
          <button onClick={onSubmit}>확인</button>  
        </div>
        <button onClick={onClose} className='modalClose'>닫기</button>
      </div>
    </div>
  );
}

export default Unregister;
