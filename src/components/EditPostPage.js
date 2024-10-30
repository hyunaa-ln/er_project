import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function EditPostPage() {
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mbti, setMbti] = useState('ISTJ'); // 기본값 설정
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const postData = await response.json();
                setTitle(postData.data.postTitle);
                setContent(postData.data.postContent);
                setMbti(postData.data.mbti); // 서버에서 가져온 MBTI 설정
            } catch (err) {
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ postTitle: title, postContent: content, mbti }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            alert('게시물이 수정되었습니다.');
            navigate(`/communityPost/${postId}`); // 수정 후 게시물 페이지로 이동
        } catch (err) {
            console.error('Error updating post:', err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="newPost">
            <BackButton />
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={title}
                            placeholder="타이틀"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={20}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            value={content}
                            placeholder="내용을 입력해주세요"
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
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
                        완료
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPostPage;
