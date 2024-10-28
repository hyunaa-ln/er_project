import React from 'react'
import { useNavigate } from 'react-router-dom'
/*img*/
import thumb from '../assets/Vector.svg'

function NickNamePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/joinComplete');
    };

  return (
    <div className='findPwd'>
        <img src={thumb} className='nick_thumb'alt='thumb'></img>
        <form>
            <div>
                <label htmlFor=''>닉네임</label>
                <input
                    type='text'
                    id=''
                    required
                    placeholder='닉네임 입력'
                />
                <button type='submit' onClick={handleClick}>입력완료</button>
            </div>
        </form>
    </div>
  )
}

export default NickNamePage