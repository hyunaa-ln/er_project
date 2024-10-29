import React, { useState } from 'react';
import BackButton from './BackButton';

function NewPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 폼 제출 시 데이터 처리 로직 추가
        console.log('제목:', title);
        console.log('내용:', content);
    };

  return (
    <div className='newPost'>
        <BackButton />
        <div className='post-form'>
            <button type='submit' className='addBtn'>등록</button>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        placeholder='타이틀'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={20}
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        id='content'
                        value={content}
                        placeholder='내용을 입력해주세요'
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
            </form>
        </div>
    </div>
  )
}

export default NewPostPage