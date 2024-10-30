import React, { useState } from 'react';
import BackButton from './BackButton';

function NewPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mbti, setMbti] = useState('ISTJ'); // 기본값 설정

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            postTitle: title,
            postContent: content,
            mbti: mbti,
        };

        try {
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // 로그인 토큰
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('게시글 등록 성공:', data);
            alert('게시글이 등록되었습니다!');
            // 성공 시 다른 페이지로 이동하거나 초기화
        } catch (error) {
            console.error('게시글 등록 실패:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div className="newPost">
            <BackButton />
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            placeholder="타이틀"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={20}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            id="content"
                            value={content}
                            placeholder="내용을 입력해주세요"
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* MBTI 선택 드롭다운 */}
                    <div className="form-group">
                        <label htmlFor="mbti">MBTI 선택</label>
                        <select id="mbti" value={mbti} onChange={(e) => setMbti(e.target.value)} required>
                            {[
                                'ISTJ',
                                'ISFJ',
                                'INFJ',
                                'INTJ',
                                'ISTP',
                                'ISFP',
                                'INFP',
                                'INTP',
                                'ESTP',
                                'ESFP',
                                'ENFP',
                                'ENTP',
                                'ESTJ',
                                'ESFJ',
                                'ENFJ',
                                'ENTJ',
                            ].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="addBtn">
                        등록
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewPostPage;
