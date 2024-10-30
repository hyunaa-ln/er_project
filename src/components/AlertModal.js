import React from 'react';
import logo from '../assets/Logo.svg'

function AlertModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className='alertModal'>
      <div className='modalWrap'>
        <img src={logo} alt='logo'></img>
        {children}
        <button onClick={onClose} className='modalClose'>닫기</button>
      </div>
    </div>
  );
}


export default AlertModal;