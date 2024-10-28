import React from 'react'
import BackButton from './BackButton';
import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <div>
        <BackButton />

        <h2 className='mypage_h2'>마이페이지</h2>

        <div className='mypage_profile'>
            <div className='mypage_thumb'>
                <img alt=''></img>
            </div>
            <div className='mypage_nameBox'>
                <p>닉네임</p>
                <p>abcde@gmail.com</p>
            </div>
        </div>

        <ul className='mypage_list'>
            <li><Link to=''>내가 쓴 글</Link></li>
            <li><Link to=''>내가 쓴 댓글</Link></li>
            <li><Link to=''>비밀번호 수정</Link></li>
            <li><Link to=''>로그아웃</Link></li>
        </ul>

        <button className='unregister'>
            회원탈퇴
        </button>
    </div>
  )
}

export default MyPage