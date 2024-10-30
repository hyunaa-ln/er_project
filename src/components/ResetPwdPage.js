import React from 'react'
import BackButton from './BackButton';

function ResetPwdPage() {
  return (
    <div className='resetPwd'>
        <BackButton />
        <h2>비밀번호 수정</h2>

        <form className='resetPwdForm'>
            <label htmlFor="">현재 비밀번호</label>
            <input
                type="password"
                id=""
                required
                placeholder="사용중인 비밀번호를 입력하세요"
            />
            <label htmlFor="">새 비밀번호</label>
            <input
                type="password"
                id=""
                required
                placeholder="6자리 이상, 특수문자 포함"
            />
            <label htmlFor="">새 비밀번호 확인</label>
            <input
                type="password"
                id=""
                required
                placeholder="비밀번호 재입력"
            />
            <div className="done">
                <button type="submit">
                    입력완료
                </button>
            </div>
        </form>
    </div>
  )
}

export default ResetPwdPage